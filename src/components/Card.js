import React from "react";

const Card = ({
  like,
  prod,
  isFavourite,
  onCardClick,
  AddToFavourites,
  data,
}) => {
  return (
    <div className="container ">
      <div
        onClick={(e) => {
          if (
            e.target.className === "far fa-heart" ||
            e.target.className === "fas fa-heart"
          ) {
            //do nothing
          } else {
            onCardClick();
          }
        }}
        className="row mt-1 prod-container"
      >
        <div className="col-sm-4 ">
          <div className="design-prod-image">
            <img alt={data.title} src={data.imgUrl} />
          </div>
        </div>
        <div className="col-md-8 col-sm-12 ">
          <div className="row mt-3">
            <div className="col-sm-8">
              <p className="design-title">{data.title}</p>
              <p className="design-date">{data.date}</p>
              <p className="design-description">{data.description}</p>
            </div>
            {like && (
              <div className="col-sm-4">
                <div
                  onClick={() => {
                    AddToFavourites();
                  }}
                  className="fav-container"
                >
                  <p>
                    {isFavourite(prod._id) ? (
                      <i className="fas fa-heart"></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="line-c"></div>
      <br />
    </div>
  );
};

export default React.memo(Card);
