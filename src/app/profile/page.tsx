"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(user);
    
    // 이메일은 변경 불가, 이름은 현재 이름으로 설정
    setFormData(prev => ({
      ...prev,
      name: parsedUser.name,
      email: parsedUser.email
    }));
    setIsLoaded(true);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === formData.email);
    
    if (userIndex === -1) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    // 현재 비밀번호 확인
    if (users[userIndex].password !== formData.password) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 새 비밀번호 변경 로직
    if (formData.newPassword) {
      if (formData.newPassword !== formData.newPasswordConfirm) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }
      users[userIndex].password = formData.newPassword;
    }

    // 이름 변경 적용
    users[userIndex].name = formData.name;
    
    // 로컬 스토리지 업데이트
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ name: formData.name, email: formData.email }));
    
    alert("회원정보가 성공적으로 수정되었습니다.");
    router.push('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? 모든 정보가 삭제되며 복구할 수 없습니다.")) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const filteredUsers = users.filter((u: any) => u.email !== formData.email);
      
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      localStorage.removeItem('currentUser');
      
      alert("회원 탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.");
      router.push('/');
    }
  };

  if (!isLoaded) return null;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back_link}>
        ← 홈으로 돌아가기
      </Link>
      
      <div className={`${styles.profile_card} reveal visible`}>
        <h1 className={styles.title}>회원정보 수정</h1>
        <p className={styles.subtitle}>이름과 비밀번호를 변경하실 수 있습니다.</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="email">이메일 (변경 불가)</label>
            <input type="email" id="email" value={formData.email} disabled className={styles.input} />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className={styles.input} required />
          </div>
          
          <div className={styles.input_group}>
            <label htmlFor="password">현재 비밀번호</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="정보 수정을 위해 현재 비밀번호를 입력하세요" required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="newPassword">새 비밀번호 (선택)</label>
            <input type="password" id="newPassword" value={formData.newPassword} onChange={handleChange} className={styles.input} placeholder="변경시에만 입력하세요" />
          </div>
          
          <div className={styles.input_group}>
            <label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
            <input type="password" id="newPasswordConfirm" value={formData.newPasswordConfirm} onChange={handleChange} className={styles.input} placeholder="변경할 비밀번호 다시 입력" />
          </div>
          
          <button type="submit" className={styles.btn_save}>정보 수정 완료</button>
          
          <button type="button" onClick={handleDeleteAccount} className={styles.btn_delete}>
            회원 탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}
