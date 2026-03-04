"use client";

import { motion } from "framer-motion";
import { Copy, Mail, Linkedin, Github, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { personalInfo, socialLinks } from "@/data/portfolio";

export function Contact() {
    const [copied, setCopied] = useState(false);
    const email = personalInfo.email;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email", err);
        }
    };

    return (
        <section id="contact" className="relative z-20 py-32 px-6 w-full max-w-5xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="relative z-10 text-sm font-medium text-white/80">Available for Opportunities</span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 mb-8 leading-tight">
                    Let&apos;s build something <br className="hidden md:block" /> amazing together.
                </h2>

                <p className="text-xl md:text-2xl text-white/50 max-w-2xl mb-12">
                    I&apos;m currently open for new roles and freelance projects. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>

                {/* Email Copy Button */}
                <button
                    onClick={handleCopy}
                    className="group relative flex items-center space-x-4 px-8 py-5 rounded-full bg-white/10 border border-white/20 overflow-hidden hover:border-emerald-500/50 transition-all active:scale-95 cursor-pointer max-w-full"
                >
                    <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <div className="relative z-10 p-3 bg-white/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                        {copied ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                            <Mail className="w-6 h-6 text-white/80 group-hover:text-emerald-400 transition-colors" />
                        )}
                    </div>
                    <div className="relative z-10 text-left">
                        <p className="text-sm font-medium text-white/50 mb-0.5">Drop me a line</p>
                        <p className="text-lg md:text-xl font-semibold text-white truncate max-w-[200px] md:max-w-none">
                            {email}
                        </p>
                    </div>
                    <div className="relative z-10 pl-4 border-l border-white/10">
                        {copied ? (
                            <span className="text-emerald-400 font-medium text-sm">Copied!</span>
                        ) : (
                            <Copy className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                        )}
                    </div>
                </button>

                {/* Social Links */}
                <div className="flex items-center space-x-6 mt-16 pb-12">
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all cursor-pointer"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all cursor-pointer"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
