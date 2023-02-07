import { Answer } from "@/components";
import { ForumLayout } from "@/layouts/ForumLayout";
import { NextPage } from "next";

interface QuestionPageProps {}

const QuestionPage: NextPage<QuestionPageProps> = ({}) => {
  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <div className="ques__inner">
          <svg className="options" width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#options" />
          </svg>

          <div className="userInfo">
            <a href="#">
              <img src="../img/avatar.png" alt="avatar" className="avatar" />
            </a>
            <div className="box">
              <a href="#">
                <h6 className="name">Dmitriy Bozhko</h6>
              </a>
              <div className="date">3 часа назад</div>
            </div>
          </div>

          <h1 className="title">string, класс, структуры C++</h1>

          <ul className="tagList">
            <li className="tag hover">
              <a href="#">POSTGRES</a>
            </li>
            <li className="tag hover">
              <a href="#">PYthon</a>
            </li>
            <li className="tag hover">
              <a href="#">C++</a>
            </li>
            <li className="tag hover">
              <a href="#">HTML</a>
            </li>
            <li className="tag hover">
              <a href="#">Css</a>
            </li>
            <li className="tag hover">
              <a href="#">scss</a>
            </li>
          </ul>

          <div className="ques__content">
            <p className="text">
              Всем привет!
              <br />
              <br />
              Помогите, пожалуйста, найти ошибку в коде. Прошу прощения заранее,
              если мой вопрос кажется вам глупым, я только изучаю с++ и никак не
              могу понять, что делаю не так.
              <br />
              <br />
              Я писала лабораторную для института, суть: создать базу данных на
              основе структуры, а также управлять этими структурами, используя
              методы класса. Вывод на экран разных сообщений обязательно должен
              быть где-то вне класса (в классе не может быть cin, cout).
              <br />
              <br />
              С проблемой я столкнулась уже в процессе создания базы данных
              (поэтому других функций пока нет). Я могу ввести название
              экзамена, и выполнение программы останавливается, хотя по задумке
              она должна попросить ввести еще дату, фамилию (и так всего 3 раза,
              т.е. мы должны заполнить 3 структуры, потому что введенный размер
              базы данных = 3).
              <br />
              <br />
              Вот код:
            </p>

            <div className="code">
              <div className="code__inner">
                struct myStructure <br />
                string ExamName;
                <br />
                string ExamDate;
                <br />
                string ProfessorLastname;
                <br />
                bool isEmpty = true;
                <br />
              </div>
            </div>

            <img src="../img/test-img.png" alt="img" className="img" />

            <p className="text">
              Может быть, это какая-то проблема со string?
              <br />
              <br />
              (если есть замечания по поводу стиля, логичности\нелогичности, с
              радостью выслушаю!)
              <br />
              <br />
              Благодарю за внимание!
            </p>
          </div>

          <div className="ques__footer">
            <div className="item">120 просмотров</div>
            <div className="item">3 ответа</div>
          </div>
        </div>

        <div className="answers">
          <h2 className="answer__title">Ответы</h2>
          <Answer />
        </div>
      </div>
    </ForumLayout>
  );
};

export default QuestionPage;
