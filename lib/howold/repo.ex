defmodule Howold.Repo do
  use Ecto.Repo,
    otp_app: :howold,
    adapter: Ecto.Adapters.SQLite3
end
