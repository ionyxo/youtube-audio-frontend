import { motion } from 'motion/react';
import { Download, Music, Clock, Radio, Disc3 } from 'lucide-react';
import { WaveformVisualization } from './WaveformVisualization';

interface ProcessingSectionProps {
  isProcessing: boolean;
  audioData: {
  bpm: number;
  key: string;
  duration: string;
  sampleRate: string;
  downloadUrl?: string;
} | null;

}

export function ProcessingSection({ isProcessing, audioData }: ProcessingSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border overflow-hidden shadow-2xl"
        >
          {/* Waveform */}
          <div className="p-8 border-b border-border">
            <WaveformVisualization isProcessing={isProcessing} />
          </div>

          {/* Audio Data Grid */}
          {audioData && !isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {/* BPM */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-background/80 rounded-2xl p-6 border border-border group-hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Radio className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">BPM</span>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {audioData.bpm}
                    </p>
                  </div>
                </motion.div>

                {/* Key */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-background/80 rounded-2xl p-6 border border-border group-hover:border-secondary/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Music className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Key</span>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      {audioData.key}
                    </p>
                  </div>
                </motion.div>

                {/* Duration */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-background/80 rounded-2xl p-6 border border-border group-hover:border-accent/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">Duration</span>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {audioData.duration}
                    </p>
                  </div>
                </motion.div>

                {/* Sample Rate */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-background/80 rounded-2xl p-6 border border-border group-hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Disc3 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Sample Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {audioData.sampleRate}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Download Button */}
              <motion.button
              onClick={() => {
  const url = audioData?.downloadUrl;
  if (!url) return alert("No download link yet");
  window.open(url, "_blank");
}}

                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative px-8 py-5 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl font-semibold text-primary-foreground hover:shadow-[0_0_40px_rgba(57,255,20,0.4)] transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 justify-center text-lg">
                  <Download className="w-6 h-6" />
                  Download WAV File
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 border-4 border-primary/30 border-t-primary rounded-full"
              />
              <p className="text-xl text-muted-foreground">
                Analyzing your audio...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
