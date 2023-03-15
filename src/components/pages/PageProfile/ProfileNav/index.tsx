import ss from "./ProfileNav.module.scss";
import { useSelectors } from "@/hooks/useSelectors";
import classNames from "classnames";
import React from "react";

const navLabels = [
  { id: 1, name: "Мои вопросы", name2: "Вопросы" },
  { id: 2, name: "Мое избранное", name2: "Избранное" },
];

interface ProfileNavProps {
  userId: number;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ userId }) => {
  const [activeLabel, setActiveLabel] = React.useState(0);
  const { data: userData } = useSelectors((state) => state.user);

  return (
    <ul className={ss.nav}>
      {navLabels.map(
        (obj, index) =>
          userData?.id !== userId &&
          obj.id !== 2 && (
            <li
              onClick={() => setActiveLabel(index)}
              className={classNames("hover", ss.item, {
                [ss.active]: index === activeLabel,
              })}
              key={obj.id}
            >
              {userData?.id === userId ? obj.name : obj.name2}
            </li>
          )
      )}
    </ul>
  );
};
