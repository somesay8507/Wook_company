"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 로컬 스토리지에서 회원 정보 확인
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      alert(`${user.name}님, 환영합니다!`);
      router.push('/');
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back_link}>
        ← 홈으로 돌아가기
      </Link>
      
      <div className={`${styles.login_card} reveal visible`}>
        <div className={styles.logo_group}>
          <span className={styles.logo_main}>WOOK</span>
          <span className={styles.logo_side}>COMPANY</span>
        </div>
        
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.subtitle}>계정에 로그인하여 서비스를 이용하세요.</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="name@company.com" required />
          </div>
          
          <div className={styles.input_group}>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="••••••••" required />
          </div>
          
          <button type="submit" className={styles.btn_login}>로그인</button>
        </form>
        
        <div className={styles.footer_links}>
          <Link href="#">비밀번호 찾기</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
