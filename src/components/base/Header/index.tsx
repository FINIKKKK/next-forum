import ss from "./Header.module.scss";
import { Notices } from "./Notices";
import { User } from "./User";
import { useActions } from "@/hooks/useActions";
import { useSelectors } from "@/hooks/useSelectors";
import { Theme } from "@/redux/user/types";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: userData, theme } = useSelectors((state) => state.user);
  const { setTheme } = useActions();

  const onChangeTheme = () => {
    const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;
    setTheme(newTheme);
  };

  return (
    <header className={ss.header}>
      <div className="container">
        <nav className={ss.nav}>
          <div className={ss.box}>
            <Link href="/" className={ss.logo}>
              <svg
                className={ss.logo}
                width="149"
                height="37"
                viewBox="0 0 149 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M132.675 18.7379C132.675 20.9619 132.256 22.8108 131.418 24.2849C130.58 25.7589 129.399 26.8666 127.873 27.6079C126.356 28.3404 124.57 28.7068 122.515 28.7068H116.259V9.58008H122.952C125.033 9.58008 126.797 9.93332 128.243 10.6398C129.69 11.3462 130.787 12.3798 131.537 13.7403C132.296 15.1009 132.675 16.7668 132.675 18.7379ZM127.251 18.921C127.251 17.7611 127.092 16.8017 126.775 16.0429C126.466 15.2754 125.999 14.7041 125.373 14.329C124.747 13.9453 123.957 13.7534 123.005 13.7534H121.484V24.468H122.648C124.235 24.468 125.399 24.0146 126.14 23.1075C126.881 22.1916 127.251 20.7962 127.251 18.921ZM147.635 28.7068H136.154V9.58008H147.635V13.7273H141.379V16.7363H147.173V20.8834H141.379V24.4941H147.635V28.7068Z"
                  fill="#74707F"
                />
                <path
                  d="M65.7217 7.44263H66.8677V9.56906H65.7217V7.44263Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M65.6846 25.5173L67 26.0309L66.2468 28.2481L65.6846 28.0691V25.5173Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M58.0155 8.08054L54.8271 9.53638L56.2992 12.6897L59.4875 11.2339L58.0155 8.08054Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M6.3795 22.7544L3.44141 22.7529L3.43985 25.7292L6.37795 25.7307L6.3795 22.7544Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M16.3405 13.3977L13.9766 13.3965L13.9753 15.7345L16.3393 15.7357L16.3405 13.3977Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M52.6061 15.8789L49.668 15.8774L49.6665 18.7832L52.6045 18.7847L52.6061 15.8789Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M74.5872 21.3629L71.6973 20.8391L71.1677 23.6973L74.0576 24.2211L74.5872 21.3629Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M88.7263 16.3405L87.2852 15.7356L86.6473 17.2219L88.0885 17.8268L88.7263 16.3405Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M84.4349 26.2977L83.2803 26.2971L83.2797 27.4391L84.4343 27.4397L84.4349 26.2977Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M79.848 20.2018L78.6934 20.2012L78.6928 21.3431L79.8474 21.3437L79.848 20.2018Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M78.9164 16.8702L77.7617 16.8696L77.7611 18.0116L78.9158 18.0122L78.9164 16.8702Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M48.3137 26.5804L45.5811 27.8281L46.8427 30.5307L49.5753 29.283L48.3137 26.5804Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M28.9315 15.9481L26.6611 16.0405L26.7546 18.2859L29.025 18.1935L28.9315 15.9481Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M40.5719 10.8733L38.2998 10.8447L38.2709 13.0918L40.543 13.1204L40.5719 10.8733Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M75.1914 4.04029L72.457 5.28882L73.7194 7.99312L76.4538 6.7446L75.1914 4.04029Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M65.7207 13.045L66.3862 12.7585L67.3386 14.7989L65.7207 15.5229V13.045Z"
                  fill="#0DF6E3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M40.6364 0.283447H2.36508C1.05888 0.283447 0 1.33069 0 2.62253V34.6608C0 35.9526 1.05888 36.9999 2.36508 36.9999H55.1547L56.8686 33.9066L60.0279 35.6186L59.2627 36.9999H63.3555C64.6617 36.9999 65.7206 35.9526 65.7206 34.6608V28.0791L62.8219 27.1098L63.6819 24.7863L65.7206 25.529V15.523L65.2908 15.7355L64.3383 13.6952L65.7206 13.0494V2.62253C65.7206 1.33069 64.6617 0.283447 63.3555 0.283447H44.2915V2.33897H40.6364V0.283447ZM16.6614 28.4941H23.5134V9.36741H18.8572V18.015C18.8572 18.4511 18.866 18.9526 18.8837 19.5195C18.9101 20.0864 18.9366 20.6489 18.9631 21.2071C18.9895 21.7565 19.016 22.2407 19.0424 22.6594H18.9631L11.9258 9.36741H5.10012V28.4941H9.72992V19.8727C9.72992 19.393 9.71669 18.8566 9.69023 18.2636C9.66378 17.6618 9.6329 17.073 9.59764 16.4974C9.56236 15.9218 9.52267 15.429 9.47859 15.0191H9.59764L16.6614 28.4941ZM27.6936 28.4941H39.1754V24.2815H32.9185V20.6708H38.7125V16.5236H32.9185V13.5146H39.1754V9.36741H27.6936V28.4941ZM60.1154 22.9341C60.4768 21.7216 60.6576 20.3786 60.6576 18.9046C60.6576 16.9161 60.3358 15.1848 59.692 13.7108C59.0483 12.2369 58.0341 11.0943 56.6497 10.2832C55.2738 9.47208 53.4837 9.06652 51.279 9.06652C49.1096 9.06652 47.3283 9.47208 45.935 10.2832C44.5415 11.0856 43.5097 12.2238 42.8395 13.6978C42.1782 15.163 41.8475 16.8899 41.8475 18.8785C41.8475 20.3699 42.0326 21.7216 42.4031 22.9341C42.7733 24.1464 43.3422 25.1886 44.1094 26.0609C44.8767 26.9242 45.8512 27.5915 47.0328 28.0625C48.2233 28.5248 49.6299 28.7557 51.2526 28.7557C52.9105 28.7557 54.3347 28.5248 55.5252 28.0625C56.7157 27.5915 57.6901 26.9199 58.4486 26.0477C59.207 25.1756 59.7625 24.1377 60.1154 22.9341ZM47.7471 21.8743C47.4826 21.0458 47.3504 20.0559 47.3504 18.9046C47.3504 17.7534 47.4781 16.7591 47.734 15.9218C47.9984 15.0845 48.4173 14.4391 48.9905 13.9856C49.5725 13.532 50.3353 13.3053 51.279 13.3053C52.6989 13.3053 53.6998 13.8068 54.2818 14.8098C54.8638 15.8128 55.1547 17.1777 55.1547 18.9046C55.1547 20.0559 55.027 21.0458 54.7712 21.8743C54.5243 22.703 54.1143 23.3397 53.5411 23.7845C52.9767 24.2291 52.2139 24.4516 51.2526 24.4516C50.3265 24.4516 49.577 24.2291 49.0038 23.7845C48.4306 23.3397 48.0118 22.703 47.7471 21.8743ZM14.8355 3.40214H22.1457V6.16651H14.8355V3.40214ZM27.7359 32.5344H23.8658V35.9367H27.7359V32.5344ZM26.6609 5.10329H30.316V7.44237H26.6609V5.10329ZM63.2121 7.44242H65.7178V9.56885H63.2121V7.44242ZM52.7688 7.53107L53.603 4.01156L51.5097 3.52616L50.6755 7.04566L52.7688 7.53107ZM40.5297 29.1321L43.9944 30.2835L43.2412 32.5008L39.7763 31.3493L40.5297 29.1321Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M74.3315 27.6437L72.8877 28.303L73.5543 29.7309L74.9981 29.0717L74.3315 27.6437Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M79.1037 29.7701L78.9072 31.3308L80.4853 31.5251L80.6818 29.9644L79.1037 29.7701Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M70.5475 32.5346L67.9424 33.7241L69.1451 36.3006L71.7502 35.1111L70.5475 32.5346Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M74.5464 13.3966L73.1025 14.0559L73.7691 15.4839L75.213 14.8246L74.5464 13.3966Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M72.7204 9.78172L71.8125 10.1963L72.2317 11.0943L73.1396 10.6797L72.7204 9.78172Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M70.648 15.5229L69.0176 16.2673L69.7703 17.8799L71.4008 17.1354L70.648 15.5229Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M80.88 10.5709L79.7676 11.0789L80.2812 12.1791L81.3936 11.6711L80.88 10.5709Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M101.521 16.3736L100.408 16.8816L100.922 17.9818L102.034 17.4738L101.521 16.3736Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M86.9005 6.37926L85.7881 6.88721L86.3017 7.98741L87.4141 7.47947L86.9005 6.37926Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M95.5007 8.91203L93.9395 7.12622L92.1338 8.67028L93.695 10.4561L95.5007 8.91203Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M94.9516 27.7919L93.8926 26.5806L92.6678 27.6279L93.7268 28.8393L94.9516 27.7919Z"
                  fill="#0DF6E3"
                />
                <path
                  d="M92.3408 19.8421L90.7998 19.3506L90.3028 20.8746L91.8438 21.3662L92.3408 19.8421Z"
                  fill="#0DF6E3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M99.985 9.60598C99.1336 9.80848 98.3722 10.1052 97.7008 10.496C96.3075 11.2984 95.2757 12.4366 94.6055 13.9105C93.9442 15.3758 93.6133 17.1027 93.6133 19.0912C93.6133 20.5826 93.7986 21.9344 94.1689 23.1469C94.5393 24.3592 95.1082 25.4014 95.8754 26.2736C96.6425 27.137 97.6171 27.8042 98.7988 28.2752C99.9893 28.7375 101.396 28.9685 103.019 28.9685C104.676 28.9685 106.101 28.7375 107.291 28.2752C108.482 27.8042 109.456 27.1327 110.214 26.2604C110.973 25.3884 111.529 24.3505 111.881 23.1469C112.243 21.9344 112.424 20.5914 112.424 19.1174C112.424 17.1288 112.102 15.3976 111.458 13.9236C110.814 12.4496 109.8 11.3071 108.415 10.496C107.04 9.68485 105.25 9.2793 103.045 9.2793C102.508 9.2793 101.994 9.30416 101.505 9.35387L101.772 9.44097L101.324 10.7813L99.7629 10.2714L99.985 9.60598ZM99.5131 22.0871C99.2484 21.2586 99.1162 20.2687 99.1162 19.1174C99.1162 17.9661 99.2441 16.9719 99.4997 16.1346C99.7644 15.2973 100.183 14.6519 100.756 14.1983C101.338 13.7448 102.101 13.5181 103.045 13.5181C104.451 13.5181 105.446 14.0096 106.03 14.9927L107.571 14.9148L107.644 16.3245L106.6 16.3773C106.814 17.1578 106.921 18.0712 106.921 19.1174C106.921 20.2687 106.793 21.2586 106.537 22.0871C106.29 22.9158 105.88 23.5524 105.307 23.9973C105.138 24.1304 104.951 24.2435 104.747 24.3369L104.793 25.2257L103.061 25.3133L103.027 24.6643H103.019C102.093 24.6643 101.343 24.4419 100.77 23.9973C100.197 23.5524 99.7775 22.9158 99.5131 22.0871ZM98.3049 16.4337L96.1168 15.7356L95.4628 17.7411L97.6511 18.4391L98.3049 16.4337ZM96.4834 22.9655L97.6477 23.337L97.2721 24.4885L96.1078 24.117L96.4834 22.9655Z"
                  fill="#74707F"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M81.9858 9.82542C82.3094 9.69073 82.6455 9.5746 82.9944 9.47706L83.2918 10.1139L84.4042 9.60593L84.223 9.21798C84.7891 9.13452 85.3838 9.09277 86.0071 9.09277C86.942 9.09277 87.9252 9.2018 88.957 9.41984C89.9977 9.62917 91.0119 9.96931 91.9996 10.4403L90.3989 14.509C89.6934 14.1776 88.9792 13.8985 88.2559 13.6717C87.5328 13.4449 86.7657 13.3315 85.9542 13.3315C85.337 13.3315 84.7859 13.4624 84.3008 13.724C83.8158 13.9769 83.4012 14.3476 83.0574 14.836C82.7134 15.3244 82.449 15.9219 82.2636 16.6283C82.0873 17.3261 81.9992 18.1198 81.9992 19.0094C81.9992 20.213 82.1536 21.2247 82.4621 22.0445C82.7708 22.8643 83.2383 23.4837 83.8644 23.9022C84.4993 24.3209 85.2929 24.5301 86.2454 24.5301C87.1095 24.5301 87.9385 24.4125 88.7321 24.1769C89.5347 23.9415 90.3417 23.6581 91.1529 23.3266V27.6962C90.8052 27.8486 90.4539 27.9837 90.0989 28.1017L90.326 27.5114L88.4174 26.7931L87.7233 28.5972L87.7915 28.6227C87.1172 28.7116 86.4122 28.7558 85.6764 28.7558C83.5778 28.7558 81.8581 28.346 80.5176 27.5261C80.2226 27.3426 79.9446 27.1433 79.6838 26.9285L80.3114 25.8181L78.9972 25.0919L78.5905 25.8122C78.1841 25.2965 77.8431 24.7209 77.5679 24.0855C77.1669 23.1471 76.8943 22.1124 76.75 20.981L78.621 20.982L78.6225 18.0762L76.6562 18.0752C76.7242 16.9765 76.9177 15.9535 77.237 15.0061C77.6515 13.8025 78.2557 12.7603 79.0493 11.8794C79.8431 10.9897 80.8218 10.3051 81.9858 9.82542ZM81.7833 13.1845L80.6287 13.1839L80.6281 14.3258L81.7827 14.3264L81.7833 13.1845Z"
                  fill="#0DF6E3"
                />
              </svg>
            </Link>
            {/* <ul className={ss.menu}>
              <li className={`${ss.item} ${ss.active}`}>
                <a href="#">Форум</a>
              </li>
              <li className={ss.item}>
                <a href="#">Лента</a>
              </li>
              <li className={ss.item}>
                <a href="#">Вакансии</a>
              </li>
            </ul> */}
          </div>

          <div className={ss.options}>
            <button onClick={onChangeTheme} className={ss.btn__theme}>
              <span
                className={classNames(ss.shape, {
                  [ss.dark]: theme === Theme.dark,
                  [ss.light]: theme === Theme.light,
                })}
              ></span>
              <span className={ss.rays}>
                <span className={ss.ray}></span>
                <span className={ss.ray}></span>
                <span className={ss.ray}></span>
                <span className={ss.ray}></span>
              </span>
            </button>
            {userData && (
              <>
                <Notices />
                <User userLogin={userData?.login} avatar={userData?.avatar} />
              </>
            )}
          </div>
          {!userData && (
            <Link href="/login" className="btn">
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
