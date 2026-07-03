document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if(mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggleBtn.querySelector('i');
        if(document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // --- Monospace Font Toggle ---
    const monoToggleBtn = document.getElementById('mono-toggle');
    
    monoToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('monospace-mode');
        if(document.body.classList.contains('monospace-mode')) {
            monoToggleBtn.style.color = 'var(--accent-color)';
        } else {
            monoToggleBtn.style.color = '';
        }
    });

    // --- Interactive Terminal ---
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalModal = document.getElementById('terminal-modal');
    const closeTerminalBtn = document.getElementById('close-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    function toggleTerminal() {
        terminalModal.classList.toggle('active');
        if(terminalModal.classList.contains('active')) {
            setTimeout(() => terminalInput.focus(), 100);
        }
    }

    terminalToggle.addEventListener('click', toggleTerminal);
    closeTerminalBtn.addEventListener('click', toggleTerminal);

    // Terminal Commands
    terminalInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            // Print user command
            printToTerminal(`<span class="prompt">sadik@portfolio:~$</span> ${command}`);

            // Handle commands
            switch(command) {
                case 'help':
                    printToTerminal(`Available commands:
                    - <span class="highlight">about</span>: Read a brief bio
                    - <span class="highlight">projects</span>: View my projects
                    - <span class="highlight">skills</span>: List technical skills
                    - <span class="highlight">contact</span>: Show contact info
                    - <span class="highlight">clear</span>: Clear terminal
                    - <span class="highlight">exit</span>: Close terminal`);
                    break;
                case 'about':
                    printToTerminal(`Java Full Stack Developer with hands-on experience in Spring Boot, REST APIs, MySQL, and React.`);
                    break;
                case 'projects':
                    printToTerminal(`1. Q-Smart (SaaS queue & appointment platform)<br>2. RaiseTogether (Scalable crowdfunding platform)`);
                    break;
                case 'skills':
                    printToTerminal(`Java, Spring Boot, React, MySQL, MongoDB, REST APIs`);
                    break;
                case 'contact':
                    printToTerminal(`Email: sadik.cse.rymec@gmail.com<br>Phone: +91-8147604850`);
                    break;
                case 'clear':
                    // Keep only the input line
                    const inputLine = terminalBody.querySelector('.terminal-input-line');
                    terminalBody.innerHTML = '';
                    terminalBody.appendChild(inputLine);
                    break;
                case 'exit':
                    toggleTerminal();
                    break;
                case '':
                    break;
                default:
                    printToTerminal(`Command not found: ${command}. Type <span class="highlight">help</span> for available commands.`);
            }
            
            // Move input line to bottom and scroll
            const inputLine = terminalBody.querySelector('.terminal-input-line');
            terminalBody.appendChild(inputLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(() => terminalInput.focus(), 10);
        }
    });

    function printToTerminal(htmlContent) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = htmlContent;
        terminalBody.insertBefore(line, terminalBody.querySelector('.terminal-input-line'));
    }

    // --- Interactive Mouse Glow ---
    // Let's make one of the glows follow the mouse slowly
    const glow1 = document.querySelector('.glow-1');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;
        
        if (glow1) {
            glow1.style.transform = \`translate(\${glowX / 5}px, \${glowY / 5}px)\`;
        }
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
});
