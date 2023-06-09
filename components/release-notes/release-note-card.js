const ReleaseNotesCard = ({ mkplace }) => {
  return (
    <>
      <article className={style["release-notes-card-box"]}>
        <h6 className={style["created-info"]}>4 AUGUST 2022</h6>
        <h1 className={style["card-name"]}>{mkplace} - 8/3/2022</h1>
        <ul className={style["card-key-points"]}>
          <li>
            Queen of Pain&apos;s boots are now an independent item slot in-game
            and on the workshop. The Form of the Abyssal Kin item that included
            both shoulders and boots is now split into two separate items, and
            customers that already have the Form of the Abyssal Kin will receive
            a copy of Abyssal Kin Legs.
          </li>
          <li>Marci is now available for Workshop Contributors</li>
          <li>Primal Beast is now available for Workshop Contributors</li>
        </ul>
      </article>
    </>
  );
};

export default ReleaseNotesCard;
