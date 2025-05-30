# ASTERUM TRAVELER

_PLAVE 팬을 위한 팬페이지_

## 소개

**Asterum Traveler**는 K-pop 그룹 **PLAVE**의 활동 기록, 스케줄, 영상, 기념일 등을 정리한 **PLAVE 팬 웹사이트**입니다.
[👉 바로가기](https://www.asterumtraveler.kr/)


## 데모

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/63dfcd5a-3585-42b4-b8e5-ba62fd8f6fdf" width="400" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/dde4efd7-6058-49a2-a018-7f25325b5d5f" width="400" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6321d865-7dde-4c3c-bf50-fcd3c391b364" width="400" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/faa6dfc9-96d2-43f3-b435-d41ba880ed4d" width="400" />
    </td>
  </tr>
</table>

## 개발 기간 및 팀 구성

- 개발 기간: 2025.10.02 ~
- 1인 개발 (프론트엔드 중심 + 백엔드 서버리스 구조)

## 사용 기술 스택

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=Jest&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>


## 기능

### 주요 기능 (사용자 흐름 기준)

- PLAVE 멤버 라이브 or 이미지를 기준으로 사용한 제품 조회 
- React Calendar 기반으로 팬 일정(Schedule)을 등록 및 조회
- 팬이 Dear 페이지에 메시지를 작성
- 모든 기능은 Firebase Firestore를 기반으로 실시간 저장 및 관리

### 기술적 구현

- Yarn Workspaces 기반의 모노레포 구성으로 App/Admin 분리
- Firebase Firestore를 데이터베이스로 사용하여 실시간 데이터 관리
- vite-plugin-ssr을 도입해 페이지별 meta 태그 SSR 구성 및 SEO 최적화 대응
- Firebase Functions + Slack Webhook으로 실시간 에러 모니터링 구축
- Framer Motion을 통한 UI 애니메이션 및 전환 효과 적용
- Jest 기반 주요 컴포넌트 단위 테스트 작성

---

## [기술적 고민 & 트러블슈팅](https://github.com/clappingmin/asterum_traveler/wiki)

- [Firebase Functions와 Slack Webhook을 활용한 에러 알림 시스템 구축](https://github.com/clappingmin/asterum_traveler/wiki/Firebase-Functions%EC%99%80-Slack-Webhook%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%97%90%EB%9F%AC-%EC%95%8C%EB%A6%BC-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%B6%95)
- [SEO 대응을 위한 vite-plugin-ssr 도입](https://github.com/clappingmin/asterum_traveler/wiki/SEO-%EB%8C%80%EC%9D%91%EC%9D%84-%EC%9C%84%ED%95%9C-vite%E2%80%90plugin%E2%80%90ssr-%EB%8F%84%EC%9E%85)
- [Vercel 배포 환경에서 vite-plugin-ssr 적용 시 404 오류 해결 과정](https://github.com/clappingmin/asterum_traveler/wiki/Vercel-%EB%B0%B0%ED%8F%AC-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-vite%E2%80%90plugin%E2%80%90ssr-%EC%A0%81%EC%9A%A9-%EC%8B%9C-404-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95)
- [모노레포와 Yarn Workspaces를 선택한 이유](https://github.com/clappingmin/asterum_traveler/wiki/%EB%AA%A8%EB%85%B8%EB%A0%88%ED%8F%AC%EC%99%80-Yarn-Workspaces%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9D%B4%EC%9C%A0)
- [모바일 대응을 위한 화면 크기 감지 및 Zoom 기반 대응 전략](https://github.com/clappingmin/asterum_traveler/wiki/%EB%AA%A8%EB%B0%94%EC%9D%BC-%EB%8C%80%EC%9D%91%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%99%94%EB%A9%B4-%ED%81%AC%EA%B8%B0-%EA%B0%90%EC%A7%80-%EB%B0%8F-Zoom-%EA%B8%B0%EB%B0%98-%EC%A0%84%EB%9E%B5)

---

## 향후 개선/추가 예정 기능

- 어드민에서 Report 이미지 업로드 시 자동으로 WebP 포맷으로 변환 처리
- 어드민에서 Dear 카드 다중 선택 후 일괄 삭제 기능 추가
- Dear 카드 작성 시 욕설 입력 감지 후 사용자에게 경고 메시지 노출
- 모바일 환경에서 접속 시 "PC 웹 환경에 최적화된 서비스" 안내 메시지 제공
