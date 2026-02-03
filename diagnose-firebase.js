/**
 * Script para diagnosticar e corrigir problema de login admin no GlobalMind
 * 
 * INSTRUÇÕES:
 * 1. Baixe a serviceAccountKey.json do Firebase Console:
 *    - Vá em Configurações do Projeto > Contas de serviço
 *    - Clique em "Gerar nova chave privada"
 *    - Salve como serviceAccountKey.json na pasta do projeto
 * 
 * 2. Instale o firebase-admin:
 *    npm install firebase-admin
 * 
 * 3. Execute:
 *    node diagnose-firebase.js
 */

const admin = require('firebase-admin');

// Substitua pelo caminho da sua chave
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const ADMIN_EMAIL = 'viviane@globalmind.com';
const EXPECTED_UID = 'qr2Tm2TOMTYYTWgPlwvKuSxio7a2';

async function diagnose() {
  console.log('🔍 Iniciando diagnóstico...\n');

  // 1. Verificar usuário no Firebase Auth
  console.log('1️⃣ Verificando Firebase Authentication...');
  try {
    const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log(`   ✅ Usuário encontrado no Auth`);
    console.log(`   📧 Email: ${userRecord.email}`);
    console.log(`   🆔 UID: ${userRecord.uid}`);
    
    if (userRecord.uid !== EXPECTED_UID) {
      console.log(`   ⚠️  ATENÇÃO: UID diferente do esperado!`);
      console.log(`      Esperado: ${EXPECTED_UID}`);
      console.log(`      Atual:    ${userRecord.uid}`);
      console.log(`   💡 O Document ID no Firestore deve ser: ${userRecord.uid}`);
    }
  } catch (error) {
    console.log(`   ❌ Usuário NÃO encontrado no Auth: ${error.message}`);
    return;
  }

  // 2. Verificar documento no Firestore
  console.log('\n2️⃣ Verificando Firestore...');
  
  // Buscar pelo UID esperado
  const docRef = db.collection('users').doc(EXPECTED_UID);
  const docSnap = await docRef.get();
  
  if (docSnap.exists) {
    console.log(`   ✅ Documento encontrado com ID: ${EXPECTED_UID}`);
    console.log(`   📋 Dados:`, docSnap.data());
  } else {
    console.log(`   ❌ Documento NÃO encontrado com ID: ${EXPECTED_UID}`);
  }

  // Buscar todos os documentos na collection users
  console.log('\n3️⃣ Listando todos os documentos em "users"...');
  const usersSnapshot = await db.collection('users').get();
  
  if (usersSnapshot.empty) {
    console.log('   ⚠️  Collection "users" está VAZIA!');
  } else {
    usersSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
      console.log(`      Dados:`, doc.data());
    });
  }

  // 4. Verificar regras (tentando ler)
  console.log('\n4️⃣ Testando permissões de leitura...');
  try {
    await db.collection('users').doc(EXPECTED_UID).get();
    console.log('   ✅ Leitura permitida (via Admin SDK)');
  } catch (error) {
    console.log(`   ❌ Erro de leitura: ${error.message}`);
  }
}

async function fix() {
  console.log('\n\n🔧 Iniciando correção...\n');

  // Obter UID real do Firebase Auth
  let realUID;
  try {
    const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
    realUID = userRecord.uid;
    console.log(`   📌 UID real do usuário: ${realUID}`);
  } catch (error) {
    console.log(`   ❌ Não foi possível obter o usuário: ${error.message}`);
    return;
  }

  // Criar/atualizar documento com UID correto
  const userData = {
    email: ADMIN_EMAIL,
    nome: 'Viviane',
    role: 'admin',
    uid: realUID,
    criadoEm: admin.firestore.FieldValue.serverTimestamp(),
    atualizadoEm: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection('users').doc(realUID).set(userData, { merge: true });
    console.log(`   ✅ Documento criado/atualizado com sucesso!`);
    console.log(`   📋 Document ID: ${realUID}`);
    console.log(`   📋 Dados:`, userData);
  } catch (error) {
    console.log(`   ❌ Erro ao criar documento: ${error.message}`);
  }

  // Se o UID esperado era diferente, deletar documento antigo
  if (realUID !== EXPECTED_UID) {
    console.log(`\n   🗑️ Removendo documento antigo com ID: ${EXPECTED_UID}`);
    try {
      await db.collection('users').doc(EXPECTED_UID).delete();
      console.log(`   ✅ Documento antigo removido`);
    } catch (error) {
      console.log(`   ⚠️ Documento antigo não existia ou erro: ${error.message}`);
    }
  }
}

// Executar
async function main() {
  await diagnose();
  
  // Perguntar se quer corrigir
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n❓ Deseja aplicar a correção? (s/n): ', async (answer) => {
    if (answer.toLowerCase() === 's') {
      await fix();
    }
    console.log('\n✅ Processo finalizado!');
    process.exit(0);
  });
}

main().catch(console.error);
