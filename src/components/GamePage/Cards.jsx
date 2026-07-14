export default function Cards({ data, onClick, isLoading }) {
  return (
    <>
      {data?.map((card) => (
        <button onClick={() => onClick(card.id)} className="card" key={card.id}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </>
          )}
        </button>
      ))}
    </>
  );
}
