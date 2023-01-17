# **Rendez-vous** : 랜덤으로 데이트 코스를 추천해주는 페이지.

개발목적 - 매번 데이트 장소를 찾는 번거러움을 해소하기위해 지역 및 분류에 따라 (ex. 지역 : 경기도 성남시, 분류 : 저녁식사 ) 다른 사람들의 데이트 장소 및 데이트 코스를 랜덤으로 매칭.

# **DB modeling**
https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmT88w%2FbtrWwoRAUt0%2FTzIsx2lAYR8M8V1NAVhUgk%2Fimg.png

# **기능구현**

### 1.회원가입.

-   회원가입시 이메일 중복체크.
-   회원가입시 유저아이디 중복체크.

### 2.로그인.

-   회원가입 아이디로 로그인.

### 3.데이트 장소 CRUD.

-   데이트 장소 정보 등록.
-   데이트 장소 정보 조회.
-   데이트 장소 정보 수정.
-   데이트 장소 정보 삭제.
-   중복 데이터 체크.

### 4.데이트 장소 즐겨찾기.

-   데이트 장소 즐겨찾기 등록.
-   데이트 장소 즐겨찾기 삭제.

### 5.방문한 데이트 장소.

-   방문한 데이트 장소 등록.
-   방문한 데이트 장소 삭제.
-   방문한 데이트 장소 리뷰.
-   방문한 데이트 장소 별점.

### 6.데이트 코스 추천.

-   지역 및 분류에 따른 데이트 코스 추천.(ex. 지역 : 경기도 성남시, 분류 : 카페 - 저녁식사 or 지역 : 서울시 강남구, 분류 : 카페).
