import { motion } from 'motion/react';
import { Music2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'About', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' }
  ];

  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
              <Music2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                WaveKey
              </h4>
              <p className="text-xs text-muted-foreground">
                AI-Powered Music Analysis
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-8"
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} WaveKey. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
