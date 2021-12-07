import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import ChildPost from "../../components/OneChild/OneChild";
import childPlaceholder from "../../img/childCardPlaceholder.jpg";
import ButtonChild from "../../UI/ButtonChild";
import InputChild from "../../UI/InputChild";
import { useDispatch } from "react-redux";
import { getchildrenInputAC, GET_PHRASE } from "../../store/OnechildInput";

function getDate(d) {
  let days = d % 365;
  const month = Math.floor(days / 30);
  const weeks = parseInt(days / 7);
  const years = Math.floor(d / 365);
  days -= weeks * 7;
  return {
    years,
    month,
    weeks,
    days,
  };
}

export const OneChildrenWithoutRouter = (props) => {
  const children = useSelector((state) => state.children.children);
  const [value, setValue] = useState("");

  //Инпут у фразы ребенка
  /*   const dispatch = useDispatch();
  const phase = useSelector((state) => state.phase.phase);
 */
  const [childrenPhrase, setChildrenPhrase] = useState([]);
  const [childText, setChildText] = useState("");
  const AddNewChildPhrase = (e) => {
    e.preventDefault();
    const newChildPhrase = {
      id: Date.now(),
      childText,
    };
    /* dispatch({ type: "GET_PHRASE", payload: e.target.value }); */
    setChildrenPhrase([...childrenPhrase, newChildPhrase]);
    setChildText("");
  };
  // input
  const [dates, setDates] = useState();
  const [filteredChildren, setFilteredChildren] = useState();
  const onChange = ({ target: { value } }) =>
    setValue((prev) => (/\d+/.test(Number(value)) ? value : prev));

  // падало, потому что ф-ю надо за компонент; потому что в переменной первоначально undefined(поэтому сначала создаем переменную, потом ее в стэйт пихаем)
  useEffect(() => {
    const filtered = children.filter(
      (item) => item.id.toString() === props.match.params.id
    );

    setFilteredChildren(filtered);
    const standartStages = filtered.map((t) => t.standartStages);
    setDates(standartStages.map((t) => t.map((t) => getDate(t.days))).flat());
  }, []);

  return (
    <div className="children_background">
      <div className="oneChild">
        <div>
          {filteredChildren &&
            filteredChildren.map((children) => (
              <div className="oneChild_title" key={children.id}>
                <div className="oneChild_name"> {children.name}</div>
                <div>
                  {" "}
                  <img
                    className="oneChild_placeholder"
                    src={childPlaceholder}
                    alt={"childPlaceholder"}
                  />{" "}
                </div>
                <div className="oneChild_age"> ГОД</div>
                <div className="oneChild_dateOfBirth">
                  Дата рождения: <br />
                  {children.dateOfBirth}{" "}
                </div>
              </div>
            ))}
        </div>
        <div className="infoChild">
          <div> РОСТ ВЕС И ТД</div>
          <div>
            <div className="infoChild_fact">Фактические данные</div>
            <div className="infoChild_faсtInfo">
              <div className="infoChild_blocInputHeight">
                <input
                  {...{ value, onChange }}
                  className="infoChild_input"
                  placeholder="Рост"
                ></input>
              </div>
              <div className="infoChild_blocInputWeight">
                <input className="infoChild_input" placeholder="Вес"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="childrenSkills">
        <div className="childrenSkills_info">
          <div className="childrenSkills_infoNow">
            Что должен уметь делать ребенок в этом возрасте?
          </div>
          <div className="childrenSkills_infoNowStend">ИНФА</div>
        </div>
        <div className="childrenSkills_info">
          <div className="childrenSkills_infoNow">
            Что умеет ребенок в этом возрасте?
          </div>
          <div className="childrenSkills_infoNowStend">ИНФА</div>
        </div>
      </div>
      <div className="oneChildren_banner">БАННЕР С РЕКЛАМОЙ</div>
      <div className="oneChildren_back">
        <div className="oneChildren_gallery">
          Галерея <button className="circle"></button>
        </div>

        <div className="oneChildren_upImg">
          <div className="oneChildren_img"></div>
          <div className="oneChildren_img"></div>
        </div>
        <div className="oneChildren_gallery"> Смешные фразы ребенка </div>

        <div>
          <form>
            <InputChild
              value={childText}
              onChange={(e) => setChildText(e.target.value)}
              type="text"
              placeholder="Смешные фразы ребенка"
            />
            <ButtonChild onClick={AddNewChildPhrase}></ButtonChild>
          </form>
          <div childrenPhrase={childrenPhrase}>
            {childrenPhrase.map((childPh, index) => (
              <ChildPost number={index + 1} post={childPh} key={childPh.id} />
            ))}
          </div>
        </div>
      </div>
      <ul>
        {dates &&
          dates.map((t) => {
            return (
              <li key={t.id}>{`
            ${typeof t.years === "number" && t.years > 0 ? t.years + "г." : ""} 
            ${
              typeof t.months === "number" && t.months > 0
                ? t.months + "м."
                : ""
            } 
            ${
              typeof t.weeks === "number" && t.days == 0 && t.weeks > 0
                ? t.weeks + "нед."
                : ""
            } 
            ${typeof t.days === "number" && t.weeks == 0 ? t.days + "д." : ""} 
          `}</li>
            );
          })}
      </ul>
    </div>
  );
};

export const OneChildren = withRouter(OneChildrenWithoutRouter);
