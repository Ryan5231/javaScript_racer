get '/' do
  erb :index
end

#refactor later to use json by storing all of these information in the database and make an ajax call
post '/game' do
  player1 = Player.create(params[:player1])
  player2 = Player.create(params[:player2])
  game = Game.create(params[:game])
  game.players << [player1,player2]
  redirect to("/game/#{game.id}")
end

get '/game/:id' do
  @game_id = params[:id]
  erb :game
end

get '/gameinfo/:id' do
  game_id = params[:id]
  game = Game.find(game_id)
  content_type :json
  return output = { player1: game.players[0].id,player2: game.players[1].id,trackLength: game.track_length }.to_json
end

put '/gameinfo/:id' do
  game = Game.find(params[:id])
  game.winner_id = params[:player_id]
  game.winning_time = params[:winning_time]
  p game
  return 200
end
