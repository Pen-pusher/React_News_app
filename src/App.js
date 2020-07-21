import React from "react";
import { getArticles } from "./api";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: "",
  };

  searchForTopic = async (topic) => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults,
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any News articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults,
    } = this.state;
    return (
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          Search any News topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        <p style={{ textAlign: "center" }}>
          Made By{" "}
          <a href="https://pen-pusher.github.io/"> Piyush Chakraborty</a>
        </p>
        <p style={{ textAlign: "center" }}>
          Backed By <a href="https://newsapi.org/"> NewsApi</a>
        </p>
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for News articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && (
          <p>Could not fetch any News articles. Please try again.</p>
        )}
      </Container>
    );
  }
}

export default App;
