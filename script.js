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
    const closeTerminalIcon = document.getElementById('close-terminal-icon');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    function toggleTerminal() {
        terminalModal.classList.toggle('active');
        if(terminalModal.classList.contains('active')) {
            setTimeout(() => terminalInput.focus(), 100);
        }
    }

    if (terminalToggle) terminalToggle.addEventListener('click', toggleTerminal);
    if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', toggleTerminal);
    if (closeTerminalIcon) closeTerminalIcon.addEventListener('click', toggleTerminal);

    function executeCommand(command) {
        command = command.trim().toLowerCase();
        if (command === '') return;

        if (command === 'clear') {
            const inputLine = terminalBody.querySelector('.terminal-input-line');
            terminalBody.innerHTML = '';
            terminalBody.appendChild(inputLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }
        
        if (command === 'exit') {
            toggleTerminal();
            return;
        }

        printToTerminal(`<span class="prompt">sadik@portfolio:~$</span> ${command}`);

        switch(command) {
            case 'help':
                printToTerminal(`Available commands:
                - <span class="highlight">about</span>: Read a brief bio
                - <span class="highlight">projects</span>: View my projects
                - <span class="highlight">skills</span>: List technical skills
                - <span class="highlight">education</span>: View education history
                - <span class="highlight">contact</span>: Show contact info
                - <span class="highlight">clear</span>: Clear terminal
                - <span class="highlight">exit</span>: Close terminal`);
                break;
            case 'about':
                printToTerminal(`Java Full Stack Developer with hands-on experience in Spring Boot, REST APIs, MySQL, and React.`);
                scrollToSection('about');
                break;
            case 'projects':
                printToTerminal(`1. Q-Smart (SaaS queue & appointment platform)<br>2. RaiseTogether (Scalable crowdfunding platform)`);
                scrollToSection('projects');
                break;
            case 'skills':
                printToTerminal(`Java, Spring Boot, React, MySQL, MongoDB, REST APIs`);
                scrollToSection('skills');
                break;
            case 'education':
                printToTerminal(`B.E. Computer Science & Engineering (2022-2026) @ RYMEC`);
                scrollToSection('education');
                break;
            case 'contact':
                printToTerminal(`Email: sadik.cse.rymec@gmail.com<br>Phone: +91-8147604850`);
                scrollToSection('contact');
                break;
            default:
                printToTerminal(`Command not found: ${command}. Type <span class="highlight">help</span> for available commands.`);
        }
        
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        if (inputLine) {
            terminalBody.appendChild(inputLine);
        }
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if(window.innerWidth < 992) {
                toggleTerminal();
            }
        }
    }

    // Input Enter Event
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                const command = terminalInput.value;
                terminalInput.value = '';
                executeCommand(command);
                setTimeout(() => terminalInput.focus(), 10);
            }
        });
    }

    // Quick Command Buttons
    document.querySelectorAll('.cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
                if (terminalInput) {
                    setTimeout(() => terminalInput.focus(), 10);
                }
            }
        });
    });

    function printToTerminal(htmlContent) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.style.marginTop = '8px';
        line.innerHTML = htmlContent;
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        if (inputLine) {
            terminalBody.insertBefore(line, inputLine);
        } else {
            terminalBody.appendChild(line);
        }
    }

    // Keyboard shortcuts for scrolling
    document.addEventListener('keydown', (e) => {
        // Only trigger if no input is focused and terminal is not active
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || 
            (terminalModal && terminalModal.classList.contains('active'))) {
            return;
        }

        const key = e.key.toLowerCase();
        switch(key) {
            case 'a': scrollToSection('about'); break;
            case 's': scrollToSection('skills'); break;
            case 'p': scrollToSection('projects'); break;
            case 'e': scrollToSection('education'); break;
            case 'c': scrollToSection('contact'); break;
            case 't': toggleTerminal(); break; // open terminal on 't'
        }
    });

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
