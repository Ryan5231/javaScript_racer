get '/' do
  # Look in app/views/index.erb
  erb :index
end

#refactor later to use json by storing all of these information in the database and make an ajax call
post '/game' do
  @game_info = params[:game]
  erb :game
end
