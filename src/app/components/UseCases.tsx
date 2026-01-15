import { motion } from 'motion/react';
import { Headphones, Disc, Shuffle, GraduationCap } from 'lucide-react';

const useCases = [
  {
    icon: Headphones,
    title: 'Music Producers',
    description: 'Sample, remix, and create new tracks with precise BPM and key information',
    color: 'primary'
  },
  {
    icon: Disc,
    title: 'DJs',
    description: 'Prepare perfect mixes by knowing exact tempo and harmonic compatibility',
    color: 'secondary'
  },
  {
    icon: Shuffle,
    title: 'Remix Creators',
    description: 'Build mashups and remixes with accurate musical analysis data',
    color: 'accent'
  },
  {
    icon: GraduationCap,
    title: 'Music Students',
    description: 'Learn music theory by analyzing your favorite tracks and patterns',
    color: 'primary'
  }
];

export function UseCases() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="mb-4">
            Built For Creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're producing, mixing, or learning—we've got you covered
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                {/* Icon with gradient background */}
                <div className={`inline-flex p-3 rounded-xl mb-4 bg-${useCase.color}/10 border border-${useCase.color}/20 group-hover:scale-110 transition-transform`}>
                  <useCase.icon className={`w-6 h-6 text-${useCase.color}`} />
                </div>

                {/* Title */}
                <h4 className="mb-2 text-foreground">
                  {useCase.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-card/50 via-card/80 to-card/50 backdrop-blur-sm rounded-3xl border border-border">
            <div className="flex-1 text-left">
              <h3 className="mb-2">
                Ready to elevate your music?
              </h3>
              <p className="text-muted-foreground">
                Join thousands of creators using our tool daily
              </p>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-primary-foreground hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all whitespace-nowrap">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
