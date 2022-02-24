//
//  Cache.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-15.
//

import Foundation
import PromiseKit
import CoreData

private extension Cache {
    final class WrappedKey: NSObject {
        let key: Key

        init(_ key: Key) { self.key = key }

        override var hash: Int { return key.hashValue }

        override func isEqual(_ object: Any?) -> Bool {
            guard let value = object as? WrappedKey else {
                return false
            }

            return value.key == key
        }
    }
}

private extension Cache {
    final class Entry {
        let value: Value

        init(value: Value) {
            self.value = value
        }
    }
}

final class Cache<Key: Hashable, Value> {
  private var wrapped: Dictionary<Key, Value> = [:]//NSCache<WrappedKey, Entry>()
  
  private var _keys = Set<Key>()

  func insert(_ value: Value, forKey key: Key) {
      wrapped[key] = value
  }

  func value(forKey key: Key) -> Value? {
    return wrapped[key]
  }

  func removeValue(forKey key: Key) {
      wrapped.removeValue(forKey: key)
      if _keys.contains(key) {
        _keys.remove(key)
      }
  }
  
  func list() -> [Value] {
    let t = wrapped.keys.map { k -> Value in
      let tt = wrapped[k]
      return tt!
    }
    return t
  }
  
  func listAsync() -> Promise<[Value]> {
    return Promise{ seal in
      let r = list()
      return seal.fulfill(r)
    }
  }
  
  func listOfNsDictsAsync() -> Promise<[Value]> {
    return Promise{ seal in
      let r = list()
      return seal.fulfill(r)
    }
  }
  
  public var count: Int {
    get {
      return wrapped.keys.count
    }
  }
}

extension Cache {
    subscript(key: Key) -> Value? {
        get { return value(forKey: key) }
        set {
            guard let value = newValue else {
                removeValue(forKey: key)
                return
            }

            insert(value, forKey: key)
        }
    }
}
