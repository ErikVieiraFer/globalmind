import { auth, db, googleProvider } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDocs, collection, query, where, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Função para criar usuário (Email/Senha)
export async function registerUser(email, password, nome, empresa, telefone) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Atualizar perfil do Auth
        await updateProfile(user, { displayName: nome });

        // Salvar dados adicionais no Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            nome: nome,
            email: email,
            empresa: empresa,
            telefone: telefone,
            role: "user",
            criadoEm: serverTimestamp()
        });

        await vincularDiagnostico(user.uid);
        return user;
    } catch (error) {
        throw error;
    }
}

// Função para Login (Email/Senha)
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await vincularDiagnostico(userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Função para Login com Google
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Verificar se usuário já existe no Firestore, se não, criar
        // (Lógica simplificada, idealmente verifica antes de sobrescrever)
        const userRef = doc(db, "users", user.uid);
        // Aqui poderíamos usar getDoc para verificar existência, 
        // mas setDoc com merge: true funciona para atualizar/criar
        await setDoc(userRef, {
            uid: user.uid,
            nome: user.displayName,
            email: user.email,
            role: "user",
            lastLogin: serverTimestamp()
        }, { merge: true });

        await vincularDiagnostico(user.uid);
        return user;
    } catch (error) {
        throw error;
    }
}

// Função para Logout
export async function logoutUser() {
    return await signOut(auth);
}

// Vincular diagnóstico anônimo ao usuário recém-criado/logado
async function vincularDiagnostico(userId) {
    const visitorId = localStorage.getItem('globalmind_visitorId');
    
    if (visitorId) {
        const q = query(collection(db, "diagnosticos"), where("visitorId", "==", visitorId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (document) => {
            const docRef = doc(db, "diagnosticos", document.id);
            await updateDoc(docRef, {
                odId: userId,
                convertido: true
            });
        });
    }
}

// Monitorar estado da autenticação
export function monitorAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        updateNav(user);
        callback(user);
    });
}

function updateNav(user) {
    const navContainer = document.querySelector('header nav');
    if (!navContainer) return;

    // Lógica simples de atualização do DOM do header
    // Em uma aplicação maior, isso seria um componente reativo
    // Aqui mantemos simples para não quebrar o layout existente
}