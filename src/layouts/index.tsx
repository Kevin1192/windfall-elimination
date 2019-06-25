import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider } from "../components";
import "./layout.css";
import { colors, fonts, spacing } from "../constants";
import { ProgressTracker } from "../components/progress-tracker";
import { ObservableRuntime, FontLayout } from "../components";

const Wrapper = styled("div")`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: auto;
  gap: ${spacing[2]};
  font-family: ${fonts.sansSerif};
  height: 100%;
`;

const Main = styled("main")`
  margin: ${spacing[1]};
  display: grid;
  justify-content: center;
  align-content: baseline;
  text-align: center;
`;

const ChildrenWrapper = styled("div")`
  max-width: 1000px;
  justify-content: center;
`;

const Footer = styled("footer")`
  background-color: ${colors.darkGreen};
  color: ${colors.white};
  width: 100%;
  bottom: 0;
  verical-align: baseline;
  text-align: center;
  padding: ${spacing[1]} 0;
`;

const FooterLink = styled("footer")`
  display: inline;
  color: ${colors.white};
  padding: ${spacing[1]};
`;

const Layout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header />
        <Location>
          {({ location }) => (
            <ProgressTracker
              linkProps={[
                {path: "/", label: "Home"},
                {path: "/prescreen-1/", label: "Prescreen"},
                {path: "/prescreen-1b/", label: "Qualification"},
                {path: "/prescreen-1c/", label: "Background Info"},
                {path: "/prescreen-2/", label: "Input Earnings"},
                {path: "/screen-1/", label: "Input Pension"},
                {path: "/screen-2/", label: "Results"},
                {path: "/screen-3/", label: "Further Info"}
              ]}
              activePath={location.pathname}
            />
          )}
        </Location>
        <ObservableRuntime children={children}>
          <Main>
          <FontLayout>
            <ChildrenWrapper id='child-wrapper'>
              {/* TODO test out this provider */}
              <QuestionProvider>{children}</QuestionProvider>
            </ChildrenWrapper>
           </FontLayout>
          </Main>
        </ObservableRuntime>

        <Footer>
          © {new Date().getFullYear()} | {data.author ? data.author : "Windfall Elimination Project"}
        </Footer>
      </Wrapper>
    )}
  />
);

export default Layout;
