class CreateLegs < ActiveRecord::Migration[5.1]
  def change
    create_table :legs do |t|
      t.string :start_stop
      t.string :end_stop
      t.integer :speed_limit
      t.string :leg_ID

      t.timestamps
    end
  end
end
