import * as m from "@/paraglide/messages";
import Button from "@/react/shared/ui/Button";

const HeaderWidget = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="content">
          <div className="block">
            <a href="/">
              <p>{m.metaTitle()}</p>
            </a>
          </div>
          <div className="block">
            <p>Home</p>
            <p>Features</p>
          </div>
          <div className="block">
            <a href="/sign-in">
              <Button>
                <div className="button-content">
                  <p>Sign In</p>
                  <img src="/icons/right-arrow.svg" alt="sign-in" />
                </div>
              </Button>
            </a>
          </div>
        </div>
        <hr />
      </div>
    </header>
  );
};

export { HeaderWidget };
