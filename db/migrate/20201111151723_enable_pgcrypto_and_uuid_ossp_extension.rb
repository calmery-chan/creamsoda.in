# frozen_string_literal: true

class EnablePgcryptoAndUuidOsspExtension < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto'
    enable_extension 'uuid-ossp'
  end
end
