import { Question } from "@/components";
import { MainLayout } from "@/layouts/MainLayout";
import { NextPage } from "next";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  return (
    <MainLayout>
      <div className="profile">
        <div className="container">
          <div className="profile__inner">
            <div className="user__info block">
              <img src="../img/avatar.png" alt="" className="avatar" />
              <h3 className="name">Dmitriy Bozhko</h3>
              <div className="info__box">
                <div className="info">
                  <div className="label">Местоположение</div>
                  <p className="item">City 17</p>
                </div>
                <div className="info">
                  <div className="label">Место работы</div>
                  <p className="item">OOO "City 17"</p>
                </div>
                <div className="info">
                  <div className="label">Email</div>
                  <p className="item">krashmate@gmail.com</p>
                </div>
              </div>
              <button className="subscribe btn">Подписаться</button>
            </div>

            <div className="user__about block">
              <div className="statistic">
                <p className="item">
                  Подписчики: <b>117</b>
                </p>
                <p className="item">
                  Вопросы: <b>12</b>
                </p>
              </div>
              <div className="info">
                <div className="label">О себе:</div>
                <p className="item">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                  <br />
                  <br />
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
              </div>
            </div>

            <div className="user__work">
              <ul className="nav">
                <li className="item hover active">Мои избранное</li>
                <li className="item hover">Мои вопросы</li>
              </ul>
              <div className="block">
                <div className="questions">
                  <Question />
                  <Question />
                  <Question />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
