import { motion } from 'motion/react';
import { Link2, Wand2, Download } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    title: 'Paste YouTube Link',
    description: 'Copy any YouTube video URL and paste it into our converter',
    gradient: 'from-primary to-accent'
  },
  {
    icon: Wand2,
    title: 'AI Analysis',
    description: 'Our AI instantly converts to WAV and detects BPM, key, and more',
    gradient: 'from-accent to-secondary'
  },
  {
    icon: Download,
    title: 'Download & Create',
    description: 'Get your high-quality WAV file with complete musical data',
    gradient: 'from-secondary to-primary'
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform any YouTube video into professional-grade audio
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-border via-border to-transparent" />
              )}

              <div className="relative bg-card/30 backdrop-blur-sm rounded-3xl p-8 border border-border hover:border-primary/30 transition-all group-hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-primary-foreground shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
