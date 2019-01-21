class CreateBonusDrivers < ActiveRecord::Migration[5.1]
  def change
    create_table :bonus_drivers do |t|
      t.integer :x_coordinate
      t.integer :y_coordinate

      t.timestamps
    end
  end
end
