class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :winner
      t.integer :track_length
      t.float :winning_time
    end
  end
end
