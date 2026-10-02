"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const SLIDES = [
  {
    title: "기업의 성장을 가속화하는\n데이터 기반 비즈니스 솔루션",
    desc: "전략 컨설팅부터 디지털 트랜스포메이션까지,\n전문가 팀이 제안하는 최적의 비즈니스 아키텍처를 경험하세요.",
    image: "/images/professional-office.png",
    btn: "무료 컨설팅 신청",
    tabLabel: "비즈니스 솔루션"
  },
  {
    title: "혁신을 디자인하는\n프리미엄 통합 매니지먼트",
    desc: "비즈니스 프로세스의 혁신을 통해 가치를 창출합니다.\n글로벌 표준에 맞춘 체계적인 솔루션을 제공합니다.",
    image: "/images/lobby.png",
    btn: "솔루션 자세히 보기",
    tabLabel: "통합 매니지먼트"
  },
  {
    title: "협업과 창의성의 조화\n함께 만드는 미래 비전",
    desc: "최첨단 기술과 인간 중심의 설계로 비즈니스의 새로운 장을 엽니다.\n성공을 향한 여정의 든든한 파트너가 되어드립니다.",
    image: "/images/workspace.png",
    btn: "문의하기",
    tabLabel: "함께 만드는 비전"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    // Check login status on mount
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    alert("로그아웃 되었습니다.");
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    // Auto Slide
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [currentSlide]); // Re-run effect when currentSlide changes to reset timer

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className="bg-grid" />

      {/* Header */}
      <header className={styles.header}>
        <div className={`${styles.header_inner} glass`}>
          <div className={styles.logo_container}>
            <div className={styles.logo_text_group}>
              <span className={styles.logo_main}>WOOK</span>
              <span className={styles.logo_side}>COMPANY</span>
            </div>
          </div>
          <nav className={styles.nav}>
            <a href="#about" className={styles.nav_link}>맞춤개발</a>
            <a href="#services" className={styles.nav_link}>부가서비스</a>
            <a href="#contact" className={styles.nav_link}>고객지원</a>
            {currentUser ? (
              <>
                <Link href="/profile" className={styles.nav_link}>
                  <strong style={{ color: 'var(--foreground)' }}>{currentUser.name}</strong>님
                </Link>
                <button onClick={handleLogout} className={styles.btn_nav}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className={styles.btn_nav}>로그인</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero_inner} key={currentSlide}>
          <div className={styles.hero_text}>
            <h1 className="fade-in-up">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              {slide.desc.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className={`${styles.cta_group} fade-in-up`} style={{ animationDelay: '0.4s' }}>
              <a href="#services" className={styles.btn_rounded}>{slide.btn}</a>
            </div>
          </div>
          <div className={`${styles.hero_image_container} fade-in-scale`}>
            <div className={styles.img_wrapper}>
              <Image 
                src={slide.image} 
                alt="Business Image" 
                width={600} 
                height={600} 
                className={styles.hero_img}
                style={{ borderRadius: '24px' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* New Tab Style Navigation */}
        <div className={styles.slider_tabs_container}>
          <button className={styles.tab_arrow} onClick={() => handleDotClick((currentSlide - 1 + SLIDES.length) % SLIDES.length)} aria-label="Previous slide">
            &lt;
          </button>
          <div className={styles.slider_tabs}>
            {SLIDES.map((s, i) => (
              <div 
                key={i} 
                className={`${styles.tab_item} ${currentSlide === i ? styles.active : ""}`}
                onClick={() => handleDotClick(i)}
              >
                <span className={styles.tab_text}>{s.tabLabel}</span>
                <div className={styles.tab_progress_bg}>
                  <div className={styles.tab_progress_bar}></div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.tab_arrow} onClick={() => handleDotClick((currentSlide + 1) % SLIDES.length)} aria-label="Next slide">
            &gt;
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className={styles.scroll_indicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* About Section - 맞춤개발 */}
      <section id="about" className={styles.services_section} style={{ background: '#f8fafc', paddingBottom: '60px' }}>
        <div className={`${styles.section_title} reveal`}>
          <h2 className={styles.main_title}>맞춤개발</h2>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '-40px' }}>고객의 비즈니스 환경에 최적화된 맞춤형 솔루션을 제공합니다.</p>
        </div>
      </section>

      {/* Services Section - 부가서비스 */}
      <section id="services" className={styles.services_section}>
        <div className={`${styles.section_title} reveal`}>
          <h2 className={styles.main_title}>부가서비스</h2>
        </div>
        <div className={styles.grid_4col}>
          <div className={`${styles.card_flat} reveal stagger-1`}>
            <div className={styles.icon}>📊</div>
            <h3>전략 컨설팅</h3>
            <p>정밀한 시장 분석 및 전략 수립</p>
          </div>
          <div className={`${styles.card_flat} reveal stagger-2`}>
            <div className={styles.icon}>💻</div>
            <h3>디지털 솔루션</h3>
            <p>맞춤형 소프트웨어 및 시스템 구축</p>
          </div>
          <div className={`${styles.card_flat} reveal stagger-3`}>
            <div className={styles.icon}>🚀</div>
            <h3>성장 가속화</h3>
            <p>글로벌 시장 진출 및 스케일업 지원</p>
          </div>
          <div className={`${styles.card_flat} reveal stagger-4`}>
            <div className={styles.icon}>🛡️</div>
            <h3>리스크 관리</h3>
            <p>체계적인 보안 및 운영 관리</p>
          </div>
        </div>
      </section>

      {/* Contact Section - 고객지원 */}
      <section id="contact" className={styles.services_section} style={{ background: '#f8fafc', paddingBottom: '80px' }}>
        <div className={`${styles.section_title} reveal`}>
          <h2 className={styles.main_title}>고객지원</h2>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '-40px' }}>궁금한 점이 있으신가요? 전문가가 빠르고 친절하게 답변해 드립니다.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${styles.footer} reveal`}>
        <p>&copy; 2026 Wook Company. All rights reserved.</p>
        <div className={styles.footer_links}>
          <a href="#">개인정보 처리방침</a>
          <a href="#">이용약관</a>
          <a href="#contact">고객지원</a>
        </div>
      </footer>
    </div>
  );
}
