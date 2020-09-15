class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :image_url
      t.string :latitude
      t.string :longitude
      t.string :phone

      t.timestamps
    end
  end
end
