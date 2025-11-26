import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-center shadow-xl"
      >
        <h1 className="text-5xl font-bold text-white mb-3">404</h1>
        <p className="text-white/60 text-lg">Página no encontrada</p>
      </motion.div>
    </div>
  );
}
