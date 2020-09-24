# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Layout/LineLength, Metrics/BlockLength
RSpec.describe SerialCode, type: :model do
  let!(:serial_code) { SerialCode.create! }

  describe 'after_initialize' do
    it 'serial_code は 16 文字の文字列である' do
      expect(serial_code.serial_code).to be_a String
      expect(serial_code.serial_code.size).to eq 16
    end
  end

  describe 'before_update' do
    let!(:serial_code_state_created) { SerialCode.create!(state: SerialCode.states[:created]) }
    let!(:serial_code_state_allowed) { SerialCode.create!(state: SerialCode.states[:allowed]) }
    let!(:serial_code_state_denied) { SerialCode.create!(state: SerialCode.states[:denied]) }

    context 'SerialCode の state を created から' do
      it 'allowed に変更できる' do
        serial_code_state_created.update!(state: SerialCode.states[:allowed])
        expect(serial_code_state_created.allowed?).to be_truthy
      end

      it 'denied に変更できる' do
        serial_code_state_created.update!(state: SerialCode.states[:denied])
        expect(serial_code_state_created.denied?).to be_truthy
      end
    end

    context 'SerialCode の state を allowed から' do
      it 'created に変更できない' do
        expect { serial_code_state_allowed.update!(state: SerialCode.states[:created]) }.to raise_error ActiveRecord::RecordNotSaved
      end

      it 'denied に変更できる' do
        serial_code_state_allowed.update!(state: SerialCode.states[:denied])
        expect(serial_code_state_allowed.denied?).to be_truthy
      end
    end

    context 'SerialCode の state を denied から' do
      it 'created に変更できない' do
        expect { serial_code_state_denied.update!(state: SerialCode.states[:created]) }.to raise_error ActiveRecord::RecordNotSaved
      end

      it 'allowed に変更できる' do
        serial_code_state_denied.update!(state: SerialCode.states[:allowed])
        expect(serial_code_state_denied.allowed?).to be_truthy
      end
    end
  end

  describe 'before_destroy' do
    let!(:serial_code_state_created) { SerialCode.create!(state: SerialCode.states[:created]) }
    let!(:serial_code_state_allowed) { SerialCode.create!(state: SerialCode.states[:allowed]) }
    let!(:serial_code_state_denied) { SerialCode.create!(state: SerialCode.states[:denied]) }

    it 'state が created であるとき、削除できる' do
      serial_code_state_created.destroy!
      expect { SerialCode.find(serial_code_state_created.id) }.to raise_error ActiveRecord::RecordNotFound
    end

    it 'state が allowed であるとき、削除できない' do
      expect { serial_code_state_allowed.destroy! }.to raise_error ActiveRecord::RecordNotDestroyed
    end

    it 'state が denied であるとき、削除できない' do
      expect { serial_code_state_denied.destroy! }.to raise_error ActiveRecord::RecordNotDestroyed
    end
  end
end
# rubocop:enable Layout/LineLength, Metrics/BlockLength
