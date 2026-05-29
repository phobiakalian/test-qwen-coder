---
title: "Python Tips yang Sering Dilupakan"
description: "Kumpulan tips dan trik Python praktis yang jarang dibahas di tutorial pemula tapi sangat berguna dalam pengembangan sehari-hari."
date: 2025-02-20
tags: ["python", "programming", "tips"]
author: "YN"
draft: false
---

## Pendahuluan

Setelah beberapa tahun menggunakan Python untuk berbagai proyek, ada beberapa fitur dan teknik yang saya temukan sangat berguna tapi jarang dibahas di tutorial dasar. Artikel ini akan membahas tips-tips tersebut.

## 1. f-string dengan Format Specifier

Banyak yang sudah tahu f-string, tapi tidak semua memanfaatkan format specifier:

```python
# Format angka dengan koma sebagai pemisah ribuan
number = 1000000
print(f"{number:,}")  # Output: 1,000,000

# Format float dengan presisi tertentu
pi = 3.14159265359
print(f"{pi:.2f}")  # Output: 3.14

# Padding dan alignment
name = "Python"
print(f"{name:>10}")  # Output: '    Python' (right aligned)
print(f"{name:<10}")  # Output: 'Python    ' (left aligned)
print(f"{name:^10}")  # Output: '  Python  ' (centered)
```

## 2. Dictionary Get dengan Default Value

Daripada mengecek key existence manual:

```python
# Cara lama
if 'key' in my_dict:
    value = my_dict['key']
else:
    value = 'default'

# Cara Pythonic
value = my_dict.get('key', 'default')
```

## 3. Unpacking dengan Asterisk

```python
# Unpack list
first, *middle, last = [1, 2, 3, 4, 5]
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Merge dictionaries
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
merged = {**dict1, **dict2}
```

## 4. Context Manager Custom

Bisa membuat context manager sendiri dengan decorator:

```python
from contextlib import contextmanager

@contextmanager
def timer(name):
    import time
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name}: {end - start:.2f} seconds")

# Penggunaan
with timer("Processing"):
    # kode yang ingin diukur waktunya
    sum(range(1000000))
```

## 5. Enum untuk Constants

Daripada menggunakan string magic:

```python
from enum import Enum

class Status(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

# Lebih aman dan IDE-friendly
status = Status.PENDING
if status == Status.APPROVED:
    # do something
    pass
```

## Penutup

Tips-tips di atas mungkin terlihat kecil, tapi bisa meningkatkan readability dan maintainability code secara signifikan. Coba terapkan di proyek Anda!
