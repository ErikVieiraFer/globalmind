(function () {
    function init() {
        var sidebar   = document.getElementById('sidebar');
        var overlay   = document.getElementById('sidebar-overlay');
        var toggle    = document.getElementById('menu-toggle');
        if (!sidebar || !overlay || !toggle) return;

        toggle.addEventListener('click', function () {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
