class Game < ActiveRecord::Base
  has_and_belongs_to_many :players
  belongs_to :winner, class_name: "Player", foreign_key: "winner_id"
end
