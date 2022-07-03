interface Props {
  debtorName: string;
  debteeName: string;
  debt: number;
}

function DebtCard(props: Props) {
  const { debtorName, debteeName, debt } = props;

  return (
    <div className="debt-card">
      <p>{`${debtorName} ➡ ${debteeName} $${debt}`}</p>
    </div>
  );
}

export default DebtCard;
