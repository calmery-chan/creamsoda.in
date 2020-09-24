# frozen_string_literal: true

class CreateSerialCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :serial_codes do |t|
      t.string :serial_code, null: false, index: true, unique: true
      t.integer :state, null: false, default: 0

      t.timestamps
    end
  end
end
