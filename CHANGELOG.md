
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Sprint1] - 2024-05-02

### Added
- [RSMPT2-35](https://est-rouge.backlog.com/view/RSMPT2-35)
  Implement "Verification token" API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/2)
- [RSMPT2-36](https://est-rouge.backlog.com/view/RSMPT2-36)
  Design template for Verification email [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/4)
- [RSMPT2-41](https://est-rouge.backlog.com/view/RSMPT2-41)
  Design Database for Registration 
- [RSMPT2-42](https://est-rouge.backlog.com/view/RSMPT2-42)
  Implement Register API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/1)
- [RSMPT2-127](https://est-rouge.backlog.com/view/RSMPT2-127)
  Migration for users [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/5)
- [RSMPT2-128](https://est-rouge.backlog.com/view/RSMPT2-128)
  Implement logging module [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/13)
- [RSMPT2-23](https://est-rouge.backlog.com/view/RSMPT2-23)
  Implement Get current user API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/8)
- [RSMPT2-29](https://est-rouge.backlog.com/view/RSMPT2-29)
  Implement Logout API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/11)
- [RSMPT2-21](https://est-rouge.backlog.com/view/RSMPT2-21)
   Implement Refresh token API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/10)
- [RSMPT2-22](https://est-rouge.backlog.com/view/RSMPT2-22)
  Implement authentication  & authorize middleware [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/7)
- [RSMPT2-24](https://est-rouge.backlog.com/view/RSMPT2-24)
  Implement Login API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/3)
- [RSMPT2-20](https://est-rouge.backlog.com/view/RSMPT2-20)
  Design DB for refresh token

### Changed
- Users can register for an account and need to confirm via email before they can log in.
- Users can log in with a confirmed account.
- The logging module is used to log incoming quests, outgoing responses and errors.
- Users can log out of their accounts if they want.
- Authentication & authorization middleware will grant permissions and authorization to each user.
 
### Bugfix from feedbacks
- [RSMPT2-133](https://est-rouge.backlog.com/view/RSMPT2-133)
  Fix bug in refresh token [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/18)
- [RSMPT2-131](https://est-rouge.backlog.com/view/RSMPT2-131)
  Configuration service use nestjs [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/17)
- [RSMPT2-130](https://est-rouge.backlog.com/view/RSMPT2-130)
  Configuration register and verification email API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/15)

## [Sprint2] - 2024-22-02
 
### Added
- [RSMPT2-72](https://est-rouge.backlog.com/view/RSMPT2-72)
  Implement Delete Car API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/24)
- [RSMPT2-73](https://est-rouge.backlog.com/view/RSMPT2-73)
  Implement Get Car Details API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/14)
- [RSMPT2-88](https://est-rouge.backlog.com/view/RSMPT2-88)
  Implement Get recommended cars API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/20)
- [RSMPT2-59](https://est-rouge.backlog.com/view/RSMPT2-59)
  Implement Get Filter Tags API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/21)
- [RSMPT2-134](https://est-rouge.backlog.com/view/RSMPT2-134)
  Deploy Server [Pull Request](https://est-rouge.backlog.com/view/RSMPT2-134)
- [RSMPT2-129](https://est-rouge.backlog.com/view/RSMPT2-129)
  Implement Error i18n [Pull Request](https://est-rouge.backlog.com/view/RSMPT2-129)
- [RSMPT2-136](https://est-rouge.backlog.com/view/RSMPT2-136)
  Seeding Cars Data [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/22)
- [RSMPT2-60](https://est-rouge.backlog.com/view/RSMPT2-60)
  Implement Get Cars by Filter API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/25)
- [RSMPT2-116](https://est-rouge.backlog.com/view/RSMPT2-116)
  Implement Search cars API [Pull Request](https://github.com/rising-stars-vn/rs-23-team-2-be/pull/26)
- [RSMPT2-70](https://est-rouge.backlog.com/view/RSMPT2-70)
  Design database for Car 

### Changed
- Users can receive a list of nominated vehicles, along with a pagination feature.
- Users can search and filter their favorite vehicles according to criteria: name, type, description, etc.
- Users can see detail of each car.
- Only role admin must be delete car feature.
- I18n supports in multi-language.
- Seeding data for support fake data .
 
### Fixed

## Documents
- [API Document](https://docs.google.com/spreadsheets/d/1A9r7yU5RERdq6dup9HoDSi41nij5823rA0hjcOA8EaU/edit?usp=sharing)
- [Sequence diagram](https://drive.google.com/drive/folders/17PSYvUFoRNm-SDOApAQghhqrb8c-D39h?usp=sharing)
- [Server error message](https://docs.google.com/spreadsheets/d/1LNtSN9ZnmVniMbWvjiIXAueHO_mTuC2l3L_rr_Fwfas/edit?usp=drive_link)
- [Database](https://drive.google.com/file/d/16zUTZawKxWmDs9TNExZix9BFGcscpVSB/view?usp=sharing)
- [Demo Application](http://t2.rs22.rising-stars.vn/en)
