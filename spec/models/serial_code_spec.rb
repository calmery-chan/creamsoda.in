# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SerialCode, type: :model do
  let!(:serial_code) { SerialCode.create! }

  describe 'after_initialize' do
    it 'serial_code に値が存在する' do
      expect(serial_code.serial_code).not_to be_empty
    end

    it 'serial_code は 16 文字の文字列である' do
      expect(serial_code.serial_code).to be_a String
      expect(serial_code.serial_code.size).to eq 16
    end
  end
end
