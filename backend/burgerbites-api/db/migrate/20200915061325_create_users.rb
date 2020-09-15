class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :location
      t.string :longitude
      t.string :latitude

      t.timestamps
    end
  end
end
