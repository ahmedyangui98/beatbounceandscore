/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
               
              >
                Creative Tim
              </a>
            </li>
            <li>
              <a
              
              >
                About Us
              </a>
            </li>
            <li>
             
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, 
           Designed by{" "}
          <a
          >
            Coders Breed Team
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
