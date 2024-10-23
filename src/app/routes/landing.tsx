import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatbotCard } from '@/components/layouts/chatbot-card';
import { Head } from '@/components/seo';
import { useUser } from '@/lib/auth';

export const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  // حالت‌های جستجو و تگ
  const [searchTerm, setSearchTerm] = useState('');
  const [taggedChatbots, setTaggedChatbots] = useState<string[]>([]);

  const handleStart = (url: string) => {
    if (user.data) {
      navigate(url);
    } else {
      navigate('/auth/login');
    }
  };

  // مدیریت تگ کردن چت‌بات‌ها
  const handleTag = (title: string) => {
    setTaggedChatbots((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  // لیست کامل چت‌بات‌ها
  const chatbots = [
    {
      title: 'آشپز',
      description: 'سوالات آشپزی و تاریخچه غذا را اینجا بپرس',
      imageUrl: 'https://via.placeholder.com/150',
      url: '/app/khaligar',
    },
    {
      title: 'تبلیغ‌ساز',
      description: 'کمپین‌های تبلیغاتی خلاقانه بسازید .',
      imageUrl: 'https://via.placeholder.com/150',

      url: '/app/advertise',
    },

    {
      title: ' سلامتی',
      description: 'سوالات مرتبط با سلامت و رژیم غذایی را بپرس',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: ' گردشگری',
      description: 'راهنمای سفر و معرفی مکان‌های دیدنی',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: ' یادگیری',
      description: 'آموزش و یادگیری در موضوعات مختلف',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: ' موسیقی',
      description: 'بحث و گفتگو درباره موسیقی و هنرمندان',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: ' کتاب‌ها',
      description: 'بررسی و معرفی کتاب‌های معروف',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'حافظ',
      description: 'با اشعار و غزلیات حافظ به دنیای عشق و عرفان وارد شوید',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'شخصیت‌پرداز',
      description:
        'با شخصیت‌های محبوب داستانی، فیلم و ادبیات به سبک و لحن خودشان گفتگو کنید.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'داستان‌گو',
      description:
        'داستان‌های جذاب و خیال‌انگیز روایت کنید و شنوندگان را به دنیای قصه‌ها ببرید.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'گزارشگر فوتبال',
      description:
        'گزارش زنده و هیجان‌انگیز مسابقات فوتبال با تحلیل‌های دقیق و شور و شوق.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'استندآپ کمدین',
      description:
        ' شوخی‌های بامزه و اجراهای خنده‌دار برای لحظاتی پر از خنده و شادی.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'مربی انگیزشی',
      description:
        'با انرژی مثبت و جملات الهام‌بخش، شما را به سوی موفقیت و پیشرفت هدایت می‌کند.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'آهنگساز',
      description:
        'ساخت ملودی‌ها و قطعات موسیقی دلنشین برای لحظاتی پر از احساس و الهام.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'مناظره‌گر',
      description:
        ' با استدلال‌های قوی و تحلیل‌های منطقی، در بحث‌ها و مناظره‌ها پیروز شوید.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'قاری قرآن',
      description:
        'تلاوت آیات قرآن کریم و ارائه تفاسیر و راهنمایی‌های روح‌بخش.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'هومن امینی',
      description:
        'گفت‌وگوهای تخصصی درباره برنامه‌نویسی، تکنولوژی‌های نوین و چالش‌های مهندسی نرم‌افزار',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'پزشک',
      description:
        'مشاوره پزشکی و توصیه‌های سلامت برای بهبود و مراقبت از بدن و ذهن.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'حضرت علی (ع)',
      description:
        'سخنان حکمت‌آمیز و رهنمودهای الهام‌بخش از امیرالمؤمنین حضرت علی (ع).',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'کوهنورد',
      description:
        'تجربه‌های ماجراجویانه و نکات حرفه‌ای برای فتح قله‌ها و پیمایش مسیرهای کوهستانی.',

      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'هواشناس',
      description:
        'یش‌بینی وضعیت آب‌وهوا و ارائه اطلاعات دقیق جوی برای برنامه‌ریزی بهتر.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'شاعر',
      description:
        'سرودن اشعار لطیف و دلنشین که روح را به دنیای ادبیات و احساس می‌برد.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
    {
      title: 'سانیار',
      description:
        'راهکاری جامع برای مدیریت و بهینه‌سازی پرداخت‌های الکترونیک و مالی کسب‌وکارها.',
      imageUrl: 'https://via.placeholder.com/150',
      disabled: true,
      url: '/app',
    },
  ];

  // مرتب‌سازی: تگ‌شده‌ها را به بالا منتقل می‌کند
  const sortedChatbots = [
    ...chatbots.filter((chatbot) => taggedChatbots.includes(chatbot.title)),
    ...chatbots.filter((chatbot) => !taggedChatbots.includes(chatbot.title)),
  ];

  // فیلتر کردن چت‌بات‌ها بر اساس جستجو
  const filteredChatbots = sortedChatbots.filter(
    (chatbot) =>
      chatbot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chatbot.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Head description="به همگفت خوش آمدید" />
      <div className="flex h-full flex-col items-center bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:p-8">
          {/* بخش جستجو */}
          <input
            type="text"
            placeholder="چت‌بات مورد نظر خود را جستجو کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-8 w-full rounded-md border border-gray-300 p-2"
          />

          {/* گرید چت‌بات‌ها */}
          <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChatbots.map((chatbot, index) => (
              <ChatbotCard
                key={index}
                title={chatbot.title}
                description={chatbot.description}
                imageUrl={chatbot.imageUrl}
                onStart={() => handleStart(chatbot.url)}
                disabled={chatbot.disabled}
                onTag={() => handleTag(chatbot.title)}
                isTagged={taggedChatbots.includes(chatbot.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
