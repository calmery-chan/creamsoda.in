# frozen_string_literal: true

class CreateChekiImages < ActiveRecord::Migration[6.0]
  def change
    create_table :cheki_images, id: :uuid do |t|
      t.string :image, null: false

      t.timestamps
    end
  end
end
