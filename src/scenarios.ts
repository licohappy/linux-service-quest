export type ScenarioStep = {
  instruction: string
  command: string
  question: string
  options: string[]
  answer: string
  explanation: string
}

export type Scenario = {
  id: string
  title: string
  story: string
  distro: string
  steps: ScenarioStep[]
}

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'The Broken Web Server',
    story: 'It\'s Monday morning. Users can\'t reach the website. SSH in — nginx is down. Walk through diagnosing and fixing it.',
    distro: 'Ubuntu/Debian',
    steps: [
      {
        instruction: 'Step 1: Check if nginx is running.',
        command: 'sudo systemctl status nginx',
        question: 'What command do you run first to check nginx status?',
        options: ['sudo systemctl status nginx', 'sudo apt install nginx', 'sudo nginx -v'],
        answer: 'sudo systemctl status nginx',
        explanation: 'Always check status first — it shows if the service is running, failed, or stopped, and often shows the last error.',
      },
      {
        instruction: 'Step 2: Nginx is failed. Check what went wrong.',
        command: 'sudo journalctl -u nginx -n 30 --no-pager',
        question: 'How do you see the last 30 log lines for nginx?',
        options: ['sudo journalctl -u nginx -n 30 --no-pager', 'cat /var/log/nginx', 'sudo systemctl logs nginx'],
        answer: 'sudo journalctl -u nginx -n 30 --no-pager',
        explanation: 'journalctl -u <service> shows service-specific logs. -n 30 limits to last 30 lines. --no-pager prints without pagination.',
      },
      {
        instruction: 'Step 3: Logs say config error. Test nginx config before restarting.',
        command: 'sudo nginx -t',
        question: 'What command tests nginx config for syntax errors?',
        options: ['sudo nginx -t', 'sudo systemctl test nginx', 'sudo nginx --check'],
        answer: 'sudo nginx -t',
        explanation: 'nginx -t tests the configuration file and reports any syntax errors without applying changes.',
      },
      {
        instruction: 'Step 4: Config is fixed. Restart nginx.',
        command: 'sudo systemctl restart nginx',
        question: 'After fixing the config, which command restarts nginx?',
        options: ['sudo systemctl restart nginx', 'sudo systemctl reload nginx', 'sudo nginx start'],
        answer: 'sudo systemctl restart nginx',
        explanation: 'restart stops then starts the service. Use reload instead if you want zero-downtime config reload (when supported).',
      },
      {
        instruction: 'Step 5: Verify nginx is back up and will survive reboot.',
        command: 'sudo systemctl enable nginx && sudo systemctl is-active nginx',
        question: 'How do you confirm nginx is active AND set to start on boot?',
        options: [
          'sudo systemctl enable nginx && sudo systemctl is-active nginx',
          'sudo systemctl start nginx',
          'sudo reboot',
        ],
        answer: 'sudo systemctl enable nginx && sudo systemctl is-active nginx',
        explanation: 'enable ensures it starts on boot. is-active confirms it\'s currently running. Together they verify both.',
      },
    ],
  },
  {
    id: 's2',
    title: 'The Rogue SSH Daemon',
    story: 'You notice SSH is behaving oddly — it\'s restarting constantly. Diagnose, stop it cleanly, fix the config, and bring it back.',
    distro: 'Fedora/RHEL',
    steps: [
      {
        instruction: 'Step 1: Check how many times sshd has restarted.',
        command: 'sudo journalctl -u sshd --since today | grep -c "Started"',
        question: 'What tool shows sshd logs from today?',
        options: ['sudo journalctl -u sshd --since today', 'sudo cat /var/log/sshd', 'sudo dmesg | grep sshd'],
        answer: 'sudo journalctl -u sshd --since today',
        explanation: '--since today filters journal logs to today only. Combine with grep to count restart events.',
      },
      {
        instruction: 'Step 2: Stop sshd and prevent it from auto-restarting.',
        command: 'sudo systemctl stop sshd',
        question: 'Which command stops sshd without disabling it for next boot?',
        options: ['sudo systemctl stop sshd', 'sudo systemctl disable --now sshd', 'sudo kill sshd'],
        answer: 'sudo systemctl stop sshd',
        explanation: 'stop halts the service now but keeps it enabled for next boot. disable would also remove boot start.',
      },
      {
        instruction: 'Step 3: Edit the SSH config to fix the issue.',
        command: 'sudo vim /etc/ssh/sshd_config',
        question: 'Where is the main SSH daemon config file?',
        options: ['/etc/ssh/sshd_config', '/etc/sshd.conf', '/root/.ssh/config'],
        answer: '/etc/ssh/sshd_config',
        explanation: '/etc/ssh/sshd_config is the server-side config. /root/.ssh/config is client-side per-user config.',
      },
      {
        instruction: 'Step 4: Restart sshd after fixing the config.',
        command: 'sudo systemctl restart sshd && sudo systemctl status sshd',
        question: 'What\'s the best way to restart and immediately verify sshd?',
        options: [
          'sudo systemctl restart sshd && sudo systemctl status sshd',
          'sudo reboot',
          'sudo systemctl reload sshd',
        ],
        answer: 'sudo systemctl restart sshd && sudo systemctl status sshd',
        explanation: 'Chain restart with status to immediately confirm it came back up cleanly.',
      },
    ],
  },
]
