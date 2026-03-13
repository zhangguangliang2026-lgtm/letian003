import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Wand2, 
  Calculator, 
  Calendar, 
  ArrowRight,
} from 'lucide-react';

// Define the structure for our application links
export interface AppItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

// Placeholder data for the applications
export const applications: AppItem[] = [
  {
    id: 'app-1',
    title: '剧本分镜大师',
    description: 'AI驱动的剧本优化与分镜生成工具。',
    icon: Wand2,
    path: '/script-optimizer',
    color: 'bg-blue-600',
  },
  {
    id: 'app-2',
    title: '角色生图大师',
    description: 'AI驱动的角色图像生成与管理工具。',
    icon: Wand2,
    path: '/character-generator',
    color: 'bg-emerald-500',
  },
  {
    id: 'app-3',
    title: '示例软件 3',
    description: '这里将放置您的第三个网页软件。',
    icon: Calendar,
    path: '/app3',
    color: 'bg-purple-500',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
            应用总控台 (App Portal)
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            欢迎来到您的专属应用中心。点击下方的卡片即可快速访问您的各个网页软件。
          </p>
        </motion.header>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={app.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 relative overflow-hidden h-full"
                >
                  {/* Top right arrow icon that appears on hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400">
                    <ArrowRight size={20} />
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl text-white ${app.color} shadow-sm`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {app.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
