import React from "react";
import { Container, Image, ListGroup, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { astrology } from "../signs";

// Styles for search results
const styles = {
  starImage: {
    height: "5rem",
    width: "4rem",
    borderRadius: "10%",
    objectFit: "cover",
    objectPosition: "50% 0",
    display: "flex",
    flexDirection: "row",
  },
  searchResult: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    marginLeft: "5%",
    textAlign: "left",
  },
  resultText: {
    paddingLeft: "2rem",
    paddingTop: "0.5rem",
  },
};

/*
 * Component to display the list of results for the search through actor names
 */

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup>
        {this.props.searchResults.length > 0 ? (
          this.props.searchResults.map((star) => {
            return (
              <ListGroup.Item
                key={star.id}
                action
                onClick={() => this.props.handleClick(star)}
              >
                <Container
                  className="d-flex justify-content-start"
                  style={styles.searchResult}
                >
                  <Image
                    style={styles.starImage}
                    alt={`Image of ${star.name}`}
                    src={`https://image.tmdb.org/t/p/w200/${star.profile_path}`}
                    onError={(evt) => {
                      evt.target.onError = null;
                      evt.target.src = "./default.png";
                    }}
                  />
                  <span style={styles.resultText}>
                    <h3>{star.name}</h3>
                    {star.birthday[9] ? (
                      <p>
                        {
                          astrology[star.birthday[5] + star.birthday[6]][
                            star.birthday[8] + star.birthday[9]
                          ]
                        }
                      </p>
                    ) : (
                      <p>Unkown</p>
                    )}
                  </span>
                </Container>
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item>
            <Alert variant="warning">
              No results found. <br></br> Check your spelling?
            </Alert>
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }
}

const mapState = (state) => {
  return {
    searchResults: state.singleStar.searchResults,
  };
};

export default connect(mapState)(SearchResults);
