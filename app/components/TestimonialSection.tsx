'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Quote, User } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role?: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
}

const initialTestimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Putri',
        role: 'Desainer Produk',
        rating: 5,
        comment: 'ProDesign Suite benar-benar mengubah alur kerja saya. Antarmuka yang intuitif dan fitur-fitur yang powerful membuatnya jadi alat andalan untuk semua proyek desain. Sangat worth it!',
        date: '2 hari lalu',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Software Developer',
        rating: 5,
        comment: 'CodeStudio luar biasa powerful. AI code completion-nya menghemat waktu saya berjam-jam setiap hari. IDE terbaik yang pernah saya gunakan, dan harganya sangat reasonable.',
        date: '1 minggu lalu',
    },
    {
        id: 3,
        name: 'Emily Rahma',
        role: 'Content Creator',
        rating: 4,
        comment: 'SoundMaster membuat editing audio jadi sangat mudah! Saya bisa memproduksi podcast berkualitas profesional hanya dalam beberapa jam belajar. Dokumentasinya juga lengkap.',
        date: '2 minggu lalu',
    },
    {
        id: 4,
        name: 'David Pratama',
        role: 'Fotografer',
        rating: 5,
        comment: 'Fitur AI enhancement PhotoLab Pro bikin takjub. Waktu editing saya berkurang setengahnya. Interface-nya bersih dan hasilnya selalu stunning.',
        date: '3 minggu lalu',
    },
    {
        id: 5,
        name: 'Jessica Andini',
        role: 'Project Manager',
        rating: 5,
        comment: 'TaskFlow Pro menjaga seluruh tim kami tetap terorganisir. Fitur kolaborasinya seamless dan dashboard analitiknya memberikan insight bagus tentang produktivitas.',
        date: '1 bulan lalu',
    },
    {
        id: 6,
        name: 'Alex Wijaya',
        role: 'Freelancer',
        rating: 4,
        comment: 'DocWriter Plus membantu saya menulis proposal dan laporan yang lebih baik. Saran AI-nya surprisingly bagus dan template-nya sangat menghemat waktu!',
        date: '1 bulan lalu',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) return;

        setIsSubmitting(true);

        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const newTestimonial: Testimonial = {
            id: Date.now(),
            name: name.trim(),
            rating,
            comment: comment.trim(),
            date: 'Baru saja',
        };

        setTestimonials([newTestimonial, ...testimonials]);
        setName('');
        setComment('');
        setRating(5);
        setIsSubmitting(false);
    };

    return (
        <section id="testimonials" className="py-24 relative bg-gradient-to-b from-white via-background to-white">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                        Testimoni
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        Apa Kata <span className="gradient-text">Pelanggan Kami</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Bergabung dengan ribuan pengguna yang puas dan telah meningkatkan
                        alur kerja mereka dengan aplikasi premium kami.
                    </p>
                </motion.div>

                {/* Testimonial Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <div className="card bg-white/80 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Quote className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">Bagikan Pengalamanmu</h3>
                                <p className="text-sm text-text-secondary">Bantu orang lain dengan berbagi feedback-mu</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Nama Kamu
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama kamu"
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="p-1"
                                        >
                                            <Star
                                                className={`w-7 h-7 transition-colors duration-200 ${star <= (hoveredRating || rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        </motion.button>
                                    ))}
                                    <span className="ml-2 text-sm text-text-secondary">
                                        {rating} dari 5 bintang
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Ulasanmu
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Bagikan pengalamanmu menggunakan aplikasi kami..."
                                    rows={4}
                                    className="textarea-field"
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting || !name.trim() || !comment.trim()}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Kirim Ulasan
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                variants={itemVariants}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="card card-hover group"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-12 h-12 text-primary" />
                                </div>

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-text-primary truncate">
                                            {testimonial.name}
                                        </h4>
                                        {testimonial.role && (
                                            <p className="text-sm text-text-secondary truncate">
                                                {testimonial.role}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-text-secondary leading-relaxed mb-4">
                                    &ldquo;{testimonial.comment}&rdquo;
                                </p>

                                {/* Date */}
                                <p className="text-xs text-text-muted">{testimonial.date}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
