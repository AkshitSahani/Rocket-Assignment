class CreateDrivers < ActiveRecord::Migration[5.1]
  def change
    create_table :drivers do |t|
      t.string :active_leg_id
      t.string :leg_progress

      t.timestamps
    end
  end
end
