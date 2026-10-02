"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    // 로컬 스토리지에 회원 정보 저장 (백엔드 DB 대체)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === formData.email)) {
      alert("이미 가입된 이메일입니다.");
      return;
    }

    users.push({ name: formData.name, email: formData.email, password: formData.password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // 회원가입과 동시에 로그인 처리
    localStorage.setItem('currentUser', JSON.stringify({ name: formData.name, email: formData.email }));
    
    alert(`${formData.name}님, 회원가입이 완료되었습니다!`);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back_link}>
        ← 홈으로 돌아가기
      </Link>
      
      <div className={`${styles.signup_card} reveal visible`}>
        <div className={styles.logo_group}>
          <span className={styles.logo_main}>WOOK</span>
          <span className={styles.logo_side}>COMPANY</span>
        </div>
        
        <h1 className={styles.title}>회원가입</h1>
        <p className={styles.subtitle}>간단한 정보 입력으로 가입을 완료하세요.</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className={styles.input} placeholder="홍길동" required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="name@company.com" required />
          </div>
          
          <div className={styles.input_row}>
            <div className={styles.input_group}>
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="••••••••" required />
            </div>
            
            <div className={styles.input_group}>
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input type="password" id="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} className={styles.input} placeholder="••••••••" required />
            </div>
          </div>

          <div className={styles.checkbox_group}>
            <input type="checkbox" id="terms" checked={formData.terms} onChange={handleChange} required />
            <label htmlFor="terms">이용약관 및 개인정보 처리방침에 동의합니다.</label>
          </div>
          
          <button type="submit" className={styles.btn_signup}>회원가입 완료</button>
        </form>
        
        <div className={styles.footer_text}>
          이미 계정이 있으신가요? 
          <Link href="/login">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
