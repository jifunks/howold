defmodule HowoldWeb.PageController do
  use HowoldWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
